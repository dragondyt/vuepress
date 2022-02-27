import {slugize} from "../utils/strUtil";

module.exports = ctx => {
    const Category = new ctx.database.Schema({
        name: {type: String, required: true},
        parent: {type: ctx.database.Schema.Types.CUID, ref: 'Category'}
    });
    Category.virtual('slug').get(function (this: typeof Category) {
        let name = this.name;

        if (!name) return;

        let str = '';

        if (this.parent) {
            const parent = ctx.database.model('Category').findById(this.parent);
            str += `${parent.slug}/`;
        }

        const map = ctx.category_map || {};

        name = map[name] || name;
        str += slugize(name, {})

        return str;
    });
    Category.virtual('posts').get(function(this: typeof Category) {
        const PostCategory = ctx.database.model('PostCategory');

        const ids = PostCategory.find({category_id: this._id}).map(item => item.post_id);

        return ctx.database.model('Post').find({
            _id: {$in: ids}
        });
    });
    Category.virtual('length').get(function (this: typeof Category) {
        return this.posts.length;
    });
    return Category;
}