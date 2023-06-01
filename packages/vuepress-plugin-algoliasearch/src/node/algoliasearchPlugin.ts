import type { Post, PostService } from '@dragondyt/vuepress-plugin-warehouse'
import { getDatabase } from '@dragondyt/vuepress-plugin-warehouse'
import type { Plugin } from '@vuepress/core'
import { logger, withSpinner } from '@vuepress/utils'
import algoliasearch from 'algoliasearch'
import striptags from 'striptags'
export interface AlgoliasearchPluginOptions {
  appId: string
  adminKey: string
  index: string
  fields: string[]
  chunkSize?: number
  clearIndex?: boolean
  callback?: (error) => any
}

const FILTER_FUNCTIONS = {
  strip: striptags,
  truncate: function truncate(post, start, end) {
    return post.substr(start, end)
  },
}
const getBasicFields = (fields: string[]): string[] =>
  fields.filter((field) => !/:/.test(field))

const getFieldsWithFilters = (fields: string[]): string[] =>
  fields.filter((field) => /:/.test(field))
const pick = (
  object,
  attributes
): Post & {
  objectID: string
} => {
  const newObject = {}
  attributes.forEach((attribute) => {
    if (Object.prototype.hasOwnProperty.call(object, attribute)) {
      newObject[attribute] = object[attribute]
    }
  })
  return newObject as any
}
const upperFirst = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
const preparePosts = (
  posts: Array<Post>,
  fields,
  fieldsWithFilters
): Array<Post> => {
  const tagsAndCategoriesFields = ['tags', 'categories'].filter((field) =>
    fields.includes(field)
  )
  return posts.map((initialPost) => {
    const postToIndex = pick(initialPost, fields) // define a unique ID to identfy this post on Algolia

    postToIndex.objectID = initialPost._id // extract tags and categories

    tagsAndCategoriesFields.forEach((field) => {
      postToIndex[field] = []
      initialPost[field].data.forEach(function (fieldElement) {
        postToIndex[field].push(fieldElement.name)
      })
    }) // execute filters of fields

    fieldsWithFilters.forEach((field) => {
      const indexedFieldName: string[] = []
      const fieldFilters: string[] = field.split(':')
      const fieldName: string = <string>fieldFilters.shift()

      if (!Object.prototype.hasOwnProperty.call(initialPost, fieldName)) {
        logger.warn(`"${initialPost.title}" post has no "${fieldName}" field.`)
        return
      }

      let fieldValue = initialPost[fieldName]
      fieldFilters.forEach(function (filter: string) {
        const filterArgs = filter.split(',')
        const filterName = <string>filterArgs.shift()
        indexedFieldName.push(upperFirst(filterName))
        filterArgs.unshift(fieldValue) // execute filter on field value
        fieldValue = FILTER_FUNCTIONS[filterName].apply(fieldValue, filterArgs)
      }) // store filter result in post object

      postToIndex[fieldName + indexedFieldName.join('')] = fieldValue
    })
    return postToIndex
  })
}
const splitIntoChunks = (array: Array<Post>, chunkSize: number): Post[][] => {
  const newArrays = array.slice(0)
  const chunks: Array<Array<Post>> = []

  while (newArrays.length) {
    chunks.push(newArrays.splice(0, chunkSize))
  }

  return chunks
}
export const algoliasearchPlugin = (
  algoliaConfig: AlgoliasearchPluginOptions
): Plugin => ({
  name: '@dragondyt/vuepress-plugin-algoliasearch',
  multiple: false,
  onGenerated: async (app) => {
    await withSpinner('algoliasearch')(async () => {
      const fields = getBasicFields(algoliaConfig.fields)
      const fieldsWithFilters = getFieldsWithFilters(algoliaConfig.fields)
      const algoliaChunkSize = algoliaConfig.chunkSize || 5000
      const database = await getDatabase(app)
      let posts = database
        .model<PostService>('Post')
        .find({
          published: true,
        })
        .sort('date', 'asc')
        .toArray()

      if (!posts.length) {
        logger.info('There is no post to index.')
        return
      }

      if (!algoliaConfig.adminKey) {
        logger.info('adminKey is empty !')
        return
      }
      posts = preparePosts(posts, fields, fieldsWithFilters)
      const chunkedPosts = splitIntoChunks(posts, algoliaChunkSize)
      const client = algoliasearch.default(
        algoliaConfig.appId,
        algoliaConfig.adminKey
      )
      const algoliaIndex = client.initIndex(algoliaConfig.index)
      if (algoliaConfig.clearIndex) {
        logger.info('Clearing index on Algolia...')
        try {
          algoliaIndex.clearObjects()
        } catch (error) {
          logger.info(`Error has occurred during clearing index : `, error)
          return algoliaConfig.callback && algoliaConfig.callback(error)
        }

        logger.info('Index cleared.')
      }
      logger.info('Indexing posts on Algolia...')

      try {
        await Promise.all(
          chunkedPosts.map((posts) => algoliaIndex.saveObjects(posts))
        )
      } catch (error) {
        logger.info(`Error has occurred during indexing posts : `, error)
        return algoliaConfig.callback && algoliaConfig.callback(error)
      }

      logger.info(`${posts.length} posts indexed.`)
    })
  },
})
