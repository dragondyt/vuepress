// @ts-ignore
const {Schema} = require('warehouse');

module.exports = ctx => {
    return new ctx.database.Schema({
        post_id: {type: Schema.Types.CUID, ref: 'Post'},
        category_id: {type: Schema.Types.CUID, ref: 'Category'}
    });
}