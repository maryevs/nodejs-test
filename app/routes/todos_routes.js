const action = require('../actions/actions');

module.exports = function (app, database) {

    //show todo with id from datasase
    app.get('/todo/:id', (request, response) => {
        action.showTodo(database, request, response);
    });

    //show all todos
    app.get('/todos', (request, response) => {
        action.showAll(database, request, response);
    });

    //update todo with id from database
    app.post('/todo/:id', (request, response) => {
        action.update(database, request, response);
    });

    //Add new todo
    app.put('/todo', (request, response) => {
        action.add(database, request, response);
    });

    //delete todo with id from database
    app.delete('/todo/:id', (request, response) => {
        action.delete(database, request, response);
    });

    app.all('*', (request, response) => {
        response.status(404);
        response.send('')
    });

};