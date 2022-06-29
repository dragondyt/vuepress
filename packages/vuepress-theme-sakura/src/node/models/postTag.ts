// @ts-ignore
const { Schema } = require('warehouse')
module.exports = (ctx) => {
  return new Schema({
    post_id: { type: Schema.Types.CUID, ref: 'Post' },
    tag_id: { type: Schema.Types.CUID, ref: 'Tag' },
  })
}
