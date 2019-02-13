const ObjectId = require('mongodb').ObjectID;

module.exports = {
    showTodo:
        (database, request, response) => {
            try {
                const id = new ObjectId(request.params.id);

                //find todo from database by id
                database.findOne({"_id": id}, (err, result) => {
                    if (checkError(result, err, response)) {
                        return;
                    }
                    showResult(result, response);
                });
            } catch (e) {
                sendStatusCode(404, response);
            }
        },

    showAll:
        (database, request, response) => {
            try {
                //find all todos
                database.find().toArray(function (err, result) {
                    if (checkError(result, err, response)) {
                        return;
                    }
                    showResult(result, response);
                });
            } catch (e) {
                sendStatusCode(404, response);
            }
        },

    update:
        (database, request, response) => {
            try {
                const $id = new ObjectId(request.params.id);

                //update todo with id from database and change "name" field
                database.updateOne({"_id": $id}, {
                    $set: {
                        'name': request.body.name,
                        'isCompleted': request.body.isCompleted
                    }
                }, (err, result) => {

                    const checkRes = result.result.n;
                    if (checkError(checkRes, err, response)) {
                        return;
                    }

                    //find todo from database by id
                    database.find({"_id": $id}).toArray(
                        (err, result) => {
                            if (checkError(result, err, response)) {
                                return;
                            }
                            showResult(result, response);
                        }
                    );
                });
            } catch (e) {
                sendStatusCode(404, response);
            }
        },

    add:
        (database, request, response) => {
            try {
                const todo = {'name': request.body.name, 'isCompleted': request.body.isCompleted};

                //Add new todo to database
                database.insert(todo, function (err, result) {
                    if (checkError(result, err, response)) {
                        return;
                    }

                    //find todo from database by 'name'
                    database.find({name: request.body.name}).toArray(
                        function (err, result) {
                            if (checkError(result, err, response)) {
                                return;
                            }
                            showResult(result, response);
                        }
                    );
                });
            } catch (e) {
                sendStatusCode(404, response);
            }
        },

    delete:
        (database, request, response) => {
            try {
                const $id = new ObjectId(request.params.id);

                //delete todo from database by 'id'
                database.remove({"_id": $id},

                    (err, result) => {
                        const checkRes = result.result.n;
                        if (checkError(checkRes, err, response)) {
                            return;
                        }

                        //show todo on screen
                        response.send({success: true});
                    }
                );
            } catch (e) {
                sendStatusCode(404, response);
            }
        }
};

function checkError(result, err, response) {
    if (!result) {
        sendStatusCode(404, response);
        return true;
    }
    if (err) {
        console.log(err);
        sendStatusCode(500, response);
        return true;
    }
    return false;
}

function showResult(result, response) {
    //show todo on screen
    response.send(result);
    //show todo on console
    console.log(result);
}

function sendStatusCode(code, response) {
    response.status(code);
    response.send('');
}
