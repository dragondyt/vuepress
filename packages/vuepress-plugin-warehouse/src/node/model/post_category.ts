import pkg from 'warehouse'
const { Schema } = pkg
export const PostCategory = (ctx): any => {
  return new Schema({
    post_id: { type: Schema.Types.CUID, ref: 'Post' },
    category_id: { type: Schema.Types.CUID, ref: 'Category' },
  })
}
