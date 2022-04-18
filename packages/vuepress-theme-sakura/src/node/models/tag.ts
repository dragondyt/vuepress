import {slugize} from "../utils/strUtil";

const {hasOwnProperty: hasOwn} = Object.prototype;
module.exports = ctx => {
    const Tag = new ctx.database.Schema({
        name: {type: String, required: true},
        parent: {type: ctx.database.Schema.Types.CUID, ref: 'Category'}
    });
    Tag.virtual('slug').get(function (this: typeof Tag) {

        const map = ctx.tag_map || {};
        let name = this.name;
        if (!name) return;

        if (Reflect.apply(hasOwn, map, [name])) {
            name = map[name] || name;
        }
        return slugize(name);
    });
    Tag.virtual('posts').get(function (this: typeof Tag) {
        const PostTag = ctx.database.model('PostTag');
        const ids = PostTag.find({tag_id: this._id}).map(item => item.post_id);
        //所有post
        return ctx.database.model('Post').find({
            _id: {$in: ids}
        }).toArray();
    });
    // Check whether a tag exists
    Tag.pre('save', data => {
        const {name} = data;
        if (!name) return;

        const Tag = ctx.database.model('Tag');
        const tag = Tag.findOne({name}, {lean: true});

        if (tag) {
            throw new Error(`Tag \`${name}\` has already existed!`);
        }
    });

    // Remove PostTag references
    Tag.pre('remove', data => {
        const PostTag = ctx.database.model('PostTag');
        return PostTag.remove({tag_id: data._id});
    });

    Tag.virtual('toObj').get(function (this: typeof Tag) {
        return {
            name: this.name,
            parent: this.parent,
            slug: this.slug,
            posts: this.posts?.data?.map(p => p.toObj()),
        }
    })

    return Tag;
}