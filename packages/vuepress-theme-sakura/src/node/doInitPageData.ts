import {App, createPage} from "@vuepress/core";
import {fs, path} from "@vuepress/utils";
import {SakuraThemeOptions} from "../shared";
import {load} from "js-yaml";

const registerModels = require('./register_models');

const Database = require('warehouse');

export async function doInitPageData(app: App, themeOptions: Partial<SakuraThemeOptions>) {
    //创建数据库
    const database = new Database({
        version: 1,
        path: path.join(app.dir.temp(), 'db.json')
    });
    registerModels({
        database: database,
        category_map: {
            '计算机科学': 'computer-science',
            'Java': 'java',
            '二进制杂谈': 'note',
            '零基础学Java语言-浙江大学-翁恺': 'course-1',
            'Theme Shoka Documentation': 'theme-shoka-doc',
        },
        tag_map: {}
    })
    //保存post
    const pages = app.pages.filter(page => (page.path != '/' && page.path != '/404.html')).map(_ => {
        const data = _.data
        if (_.filePathRelative === 'friends/index.md') {
            const filePath = path.join(app.dir.source(), 'friends/_data.yml');
            const yml = fs.readFileSync(filePath).toString();
            app.writeTemp('links.ts', `export default ${JSON.stringify(load(yml))}`);
        }
        if (!data.excerpt) {
            //生成简介
            data.excerpt = _.contentRendered.substring(0, 300).trim()
        }
        return data;
    });
    for (let page of pages) {
        let categories
        let tags

        categories = page.frontmatter.categories || [];
        delete page.frontmatter.categories;

        tags = page.frontmatter.tags || [];
        delete page.frontmatter.tags;

        if (!Array.isArray(categories)) {
            categories = [categories];
        }
        if (!Array.isArray(tags)) {
            tags = [tags];
        }
        const post = await database.model("Post").insert(page);

        await Promise.all([
            post.setCategories(categories),
            post.setTags(tags),
            page.frontmatter.id = post._id
        ]);
    }

    const PostCategory = database.model('PostCategory');
    const Category = database.model('Category');
    const PostTag = database.model('PostTag');
    const Tag = database.model('Tag');


    for (let page of pages) {
        page.frontmatter.filePath = app.dir.source()
        //目录
        const ids = PostCategory.find({post_id: page.frontmatter.id}, {lean: true}).map(item => item.category_id);
        console.log(Category.find({_id: {$in: ids}}).toArray().map(s =>s.toObj))
        page.frontmatter.categories = Category.find({_id: {$in: ids}}).toArray().map(s =>s.toObj)
        //标签
        const tagIds = PostTag.find({post_id: page.frontmatter.id}, {lean: true}).map(item => item.tag_id);
        page.frontmatter.tags = Tag.find({_id: {$in: tagIds}}).toArray().map(t =>t.toObj);
    }
    //所有post
    const query: any = {};

    if (themeOptions.future) {
        query.date = {$lte: Date.now()};
    }

    if (themeOptions.render_drafts) {
        query.published = true;
    }
    const posts = database.model('Post').find(query);

    const sticky = database.model('Post').find({
        'frontmatter': {
            "sticky": true
        }
    }).sort("-date").toArray().map(post => {
        return {
            key: post.key,
            path: post.path,
            title: post.title,
            frontmatter: post.frontmatter,
            excerpt: post.excerpt,
            cover: post.cover,
            photos: post.photos,
        }
    });

    //目录处理
    const categories = database.model('Category').filter(category => category.length);
    const covers: Array<any> = []
    const catList: Array<any> = []

    const getTopCat = function (cat) {
        if (cat.parent) {
            const pCat = categories.findOne({'_id': cat.parent});
            return getTopCat(pCat);
        } else {
            return cat
        }
    };
    if (categories && categories.length) {
        categories.forEach((cat) => {
            let cover = app.dir.source() + `/${cat.slug}/cover.jpg`
            if (fs.existsSync(cover)) {
                covers.push({
                    path: cat.slug + '/cover.jpg',
                    data: function () {
                        return fs.createReadStream(cover)
                    }
                });

                let topCat = getTopCat(cat)


                if (topCat._id != cat._id) {
                    cat.top = {
                        name: topCat.name,
                        path: topCat.slug
                    }
                }

                let child = categories.find({'parent': cat._id});
                let pl = 6;

                if (child.length != 0) {
                    cat.child = child.length;
                    cat.subs = child.sort({name: 1}).limit(6).toArray();
                    pl = Math.max(0, pl - child.length)
                    if (pl > 0) {
                        cat.subs.push.apply(cat.subs, cat.posts.sort({title: 1}).filter(function (item, i) {
                            if (item.categories.last()._id == cat._id)
                                return true
                        }).limit(pl).toArray());
                    }
                } else {
                    cat.subs = cat.posts.sort({title: 1}).limit(6).toArray();
                }
                catList.push({
                    name: cat.name,
                    length: cat.length,
                    child: cat.child,
                    top: cat.top,
                    subs: cat.subs.map(post => {
                        return {
                            name: post.name,
                            title: post.title,
                            path: post.path
                        }
                    })
                })
            }
        });
    }
    //分页
    const length = posts.length;
    const perPage = Object.prototype.hasOwnProperty.call(themeOptions, 'perPage') ? +themeOptions.perPage : 10;
    const total = perPage ? Math.ceil(length / perPage) : 1;

    for (let i = 1; i <= total; i++) {
        const data = posts.toArray().slice(perPage * (i - 1), perPage * i).map(post => {
            return {
                key: post.key,
                path: post.path,
                title: post.title,
                frontmatter: post.frontmatter,
                excerpt: post.excerpt,
                cover: post.cover,
                photos: post.photos,
            }
        })
        if (i === 1) {
            app.pages.push(await createPage(app, {
                path: "/",
                content: "",
                frontmatter: {
                    layout: "Index",
                    current: i,
                    total: total,
                    posts: data
                },
            }))
        }
        //分页
        app.pages.push(await createPage(app, {
            path: `/page/${i}`,
            content: "",
            frontmatter: {
                layout: "Index",
                current: i,
                total: total,
                posts: data
            },
        }))
        //
    }

    await app.writeTemp('stickyList.ts', `export default ${JSON.stringify(sticky)}`);
    await app.writeTemp('catList.ts', `export default ${JSON.stringify(catList)}`);
    await database.save()
}