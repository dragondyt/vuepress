import pkg from 'warehouse'
import { slugize } from '../utils/strUtil.js'

const { hasOwnProperty: hasOwn } = Object.prototype
const { Schema } = pkg
export const Tag = (ctx): any => {
  const Tag = new Schema({
    name: { type: String, required: true },
  })

  Tag.virtual('slug').get(function (this: typeof Tag) {
    const map = ctx.config.tag_map || {}
    let name = this.name
    if (!name) return

    if (Reflect.apply(hasOwn, map, [name])) {
      name = map[name] || name
    }

    return slugize(name, { transform: ctx.config.filename_case })
  })

  Tag.virtual('path').get(function (this: typeof Tag) {
    let tagDir = ctx.config.tag_dir
    if (!tagDir.endsWith('/')) tagDir += '/'

    return `${tagDir + this.slug}/`
  })
  Tag.virtual('posts').get(function (this: typeof Tag) {
    const PostTag = ctx.database.model('PostTag')

    const ids = PostTag.find({ tag_id: this._id }).map((item) => item.post_id)

    return ctx.database.model('Post').find({
      _id: { $in: ids },
    })
  })
  Tag.virtual('length').get(function (this: typeof Tag) {
    return this.posts.length
  })

  // Check whether a tag exists
  Tag.pre('save', (data) => {
    const { name } = data
    if (!name) return

    const Tag = ctx.database.model('Tag')
    const tag = Tag.findOne({ name }, { lean: true })

    if (tag) {
      throw new Error(`Tag \`${name}\` has already existed!`)
    }
  })

  // Remove PostTag references
  Tag.pre('remove', (data) => {
    const PostTag = ctx.database.model('PostTag')
    return PostTag.remove({ tag_id: data._id })
  })
  return Tag
}
