const todoRoutes = require('./todos_routes');
module.exports = function(app, db) {
    todoRoutes(app, db);
};