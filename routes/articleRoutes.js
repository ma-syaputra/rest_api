const articleControllers = require('./../api/controllers/article')
module.exports = function(app) {
    app.route('/api/article').get(articleControllers.list_article);
    app.route('/api/article/detail').get(articleControllers.detail_article);
    app.route('/api/article/add').post(articleControllers.add_article);
    app.route('/api/article/update').put(articleControllers.update_article);
    app.route('/api/article/delete').delete(articleControllers.delete_article);
    app.route('/api/author/delete').delete(articleControllers.delete_author);
    app.route('/api/author/add').post(articleControllers.add_author);
}