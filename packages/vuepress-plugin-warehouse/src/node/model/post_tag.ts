import pkg from 'warehouse'

const { Schema } = pkg
export const PostTag = (): any => {
  return new Schema({
    post_id: { type: Schema.Types.CUID, ref: 'Post' },
    tag_id: { type: Schema.Types.CUID, ref: 'Tag' },
  })
}
