import * as Promise from 'bluebird'

function removeEmptyTag(tags) {
  return tags.filter((tag) => tag != null && tag !== '').map((tag) => `${tag}`)
}

module.exports = (ctx) => {
  const Post = new ctx.database.Schema({
    id: String,
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
    //
    const PostCategory = ctx.database.model('PostCategory')
    const Category = ctx.database.model('Category')
    const id = this._id
    const allIds: string[] = []
    const existed = PostCategory.find({ post_id: id }, { lean: true }).map(
      (data) => data._id
    )
    const hasHierarchy = cats.filter(Array.isArray).length > 0
    // Add a hierarchy of categories
    const addHierarchy = (catHierarchy) => {
      const parentIds: string[] = []
      if (!Array.isArray(catHierarchy)) catHierarchy = [catHierarchy]
      // Don't use "Promise.map". It doesn't run in series.
      // MUST USE "Promise.each".
      return Promise.each(catHierarchy, (cat, i) => {
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
      hasHierarchy
        ? Promise.each(cats, addHierarchy)
        : Promise.resolve(addHierarchy(cats))
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
        ) =>
          existed.filter(
            (item) => !postCats.map((data) => data._id).includes(item)
          )
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
    const existed = PostTag.find({ post_id: id }, { lean: true }).map(
      (data) => data._id
    )

    return Promise.map(tags, (tag) => {
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
        return existed.filter(
          (item) => !tags.map((data) => data._id).includes(item)
        )
      })
      .map((tag) => PostTag.removeById(tag))
  })

  Post.method('toObj', function (this: typeof Post) {
    return {
      title: this.title,
      path: this.path,
    }
  })

  return Post
}
