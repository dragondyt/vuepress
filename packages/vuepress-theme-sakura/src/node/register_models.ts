const models = require('./models');

module.exports = ctx => {
    const db = ctx.database;

    const keys = Object.keys(models);

    for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];
        console.debug('注册',key)
        db.model(key, models[key](ctx));
    }
};