import pkg from 'warehouse'
import { slugize } from '../utils/strUtil.js'
const { Schema } = pkg
export const Category = (ctx): any => {
  const Category = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.Types.CUID, ref: 'Category' },
  })
  Category.virtual('slug').get(function (this: typeof Category) {
    let name = this.name

    if (!name) return

    let str = ''

    if (this.parent) {
      const parent = ctx.database.model('Category').findById(this.parent)
      str += `${parent.slug}/`
    }

    const map = ctx.config.category_map || {}

    name = map[name] || name
    str += slugize(name, { transform: ctx.config.filename_case })

    return str
  })
  Category.virtual('path').get(function (this: typeof Category) {
    let catDir = ctx.config.category_dir
    if (catDir === '/') catDir = ''
    if (!catDir.endsWith('/')) catDir += '/'

    return `${catDir + this.slug}/`
  })
  Category.virtual('posts').get(function (this: typeof Category) {
    const PostCategory = ctx.database.model('PostCategory')

    const ids = PostCategory.find({ category_id: this._id }).map(
      (item) => item.post_id
    )

    return ctx.database.model('Post').find({
      _id: { $in: ids },
    })
  })

  Category.virtual('length').get(function (this: typeof Category) {
    return this.posts.length
  })
  // Check whether a category exists
  Category.pre('save', (data) => {
    const { name, parent } = data
    if (!name) return

    const Category = ctx.database.model('Category')
    const cat = Category.findOne(
      {
        name,
        parent: parent || { $exists: false },
      },
      { lean: true }
    )

    if (cat) {
      throw new Error(`Category \`${name}\` has already existed!`)
    }
  })

  // Remove PostCategory references
  Category.pre('remove', (data) => {
    const PostCategory = ctx.database.model('PostCategory')
    return PostCategory.remove({ category_id: data._id })
  })
  return Category
}
