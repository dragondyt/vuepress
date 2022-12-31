import pkg from 'bluebird'
import warehousePkg from 'warehouse'

const { each, resolve, map } = pkg
const { Schema } = warehousePkg
function pickID(data): any {
  return data._id
}

function removeEmptyTag(tags): any {
  return tags.filter((tag) => tag != null && tag !== '').map((tag) => `${tag}`)
}

export const Post = (ctx): any => {
  const Post = new Schema({
    id: String,
    title: { type: String, default: '' },
    comments: { type: Boolean, default: true },
    layout: { type: String, default: 'post' },
    _content: { type: String, default: '' },
    slug: { type: String, required: true },
    photos: [String],
    link: { type: String, default: '' },
    raw: { type: String, default: '' },
    published: { type: Boolean, default: true },
    content: { type: String },
    excerpt: { type: String },
    more: { type: String },
  })
  Post.virtual('categories').get(function (this: typeof Post) {
    const PostCategory = ctx.database.model('PostCategory')
    const Category = ctx.database.model('Category')

    const ids = PostCategory.find({ post_id: this._id }, { lean: true }).map(
      (item) => item.category_id
    )

    return Category.find({ _id: { $in: ids } })
  })
  Post.method('setCategories', function (this: typeof Post, cats) {
    // Remove empty categories, preserving hierarchies
    cats = cats
      .filter((cat) => {
        return Array.isArray(cat) || (cat != null && cat !== '')
      })
      .map((cat) => {
        return Array.isArray(cat) ? removeEmptyTag(cat) : `${cat}`
      })

    const PostCategory = ctx.database.model('PostCategory')
    const Category = ctx.database.model('Category')
    const id = this._id
    const allIds: string[] = []
    const existed = PostCategory.find({ post_id: id }, { lean: true }).map(
      pickID
    )
    const hasHierarchy = cats.filter(Array.isArray).length > 0

    // Add a hierarchy of categories
    const addHierarchy = (catHierarchy: string | string[]): any => {
      const parentIds: string[] = []
      if (!Array.isArray(catHierarchy)) catHierarchy = [catHierarchy]
      // Don't use "Promise.map". It doesn't run in series.
      // MUST USE "Promise.each".
      return each(catHierarchy, (cat, i) => {
        // Find the category by name
        const data = Category.findOne(
          {
            name: cat,
            parent: i ? parentIds[i - 1] : { $exists: false },
          },
          { lean: true }
        )

        if (data) {
          allIds.push(data._id)
          parentIds.push(data._id)
          return data
        }

        // Insert the category if not exist
        const obj: {
          name: string
          parent?: string
        } = { name: cat }
        if (i) obj.parent = parentIds[i - 1]

        return Category.insert(obj)
          .catch((err) => {
            // Try to find the category again. Throw the error if not found
            const data = Category.findOne(
              {
                name: cat,
                parent: i ? parentIds[i - 1] : { $exists: false },
              },
              { lean: true }
            )

            if (data) return data
            throw err
          })
          .then((data) => {
            allIds.push(data._id)
            parentIds.push(data._id)
            return data
          })
      })
    }
    return (
      hasHierarchy ? each(cats, addHierarchy) : resolve(addHierarchy(cats))
    )
      .then(() => allIds)
      .map((catId) => {
        // Find the reference
        const ref = PostCategory.findOne(
          { post_id: id, category_id: catId },
          { lean: true }
        )
        if (ref) return ref

        // Insert the reference if not exist
        return PostCategory.insert({
          post_id: id,
          category_id: catId,
        })
      })
      .then(
        (
          postCats // Remove old categories
        ) => existed.filter((item) => !postCats.map(pickID).includes(item))
      )
      .map((cat) => PostCategory.removeById(cat))
  })
  Post.virtual('tags').get(function (this: typeof Post) {
    const PostTag = ctx.database.model('PostTag')
    const Tag = ctx.database.model('Tag')

    const ids = PostTag.find({ post_id: this._id }, { lean: true }).map(
      (item) => item.tag_id
    )

    return Tag.find({ _id: { $in: ids } })
  })
  Post.method('setTags', function (this: typeof Post, tags) {
    tags = removeEmptyTag(tags)

    const PostTag = ctx.database.model('PostTag')
    const Tag = ctx.database.model('Tag')
    const id = this._id
    const existed = PostTag.find({ post_id: id }, { lean: true }).map(pickID)

    return map(tags, (tag) => {
      // Find the tag by name
      const data = Tag.findOne({ name: tag }, { lean: true })
      if (data) return data

      // Insert the tag if not exist
      return Tag.insert({ name: tag }).catch((err) => {
        // Try to find the tag again. Throw the error if not found
        const data = Tag.findOne({ name: tag }, { lean: true })

        if (data) return data
        throw err
      })
    })
      .map((tag) => {
        // Find the reference
        const ref = PostTag.findOne(
          { post_id: id, tag_id: tag._id },
          { lean: true }
        )
        if (ref) return ref

        // Insert the reference if not exist
        return PostTag.insert({
          post_id: id,
          tag_id: tag._id,
        })
      })
      .then((tags) => {
        // Remove old tags
        return existed.filter((item) => !tags.map(pickID).includes(item))
      })
      .map((tag) => PostTag.removeById(tag))
  })
  // Remove PostTag references
  Post.pre('remove', (data) => {
    const PostTag = ctx.database.model('PostTag')
    return PostTag.remove({ post_id: data._id })
  })

  // Remove PostCategory references
  Post.pre('remove', (data) => {
    const PostCategory = ctx.database.model('PostCategory')
    return PostCategory.remove({ post_id: data._id })
  })

  // Remove assets
  Post.pre('remove', (data) => {
    const PostAsset = ctx.database.model('PostAsset')
    return PostAsset.remove({ post: data._id })
  })
  return Post
}
