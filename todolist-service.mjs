export class TodolistService {

    todolist = [
        'Eat',
        'Workout',
        'Sleep',
        'Cooks Dinner'
    ];

    getTodoJSON() {
        return JSON.stringify({
            code: 200,
            status: "OK",
            data: this.todolist.map((value, index) => {
                return {
                    id: index,
                    todo: value
                }
            })
        })
    }

    getTodo(request, response) {

        const json = this.getTodoJSON();

        response.write(json);
        response.end();
    }

    createTodo(request, response) {
        try {
            request.addListener("data", (data) => {
                const body = JSON.parse(data.toString());
                this.todolist.push(body.todo);

                response.write(this.getTodoJSON());
                response.end();
            });

        } catch (error) {
            console.log(error);
        }
    }

    updateTodo(request, response) { 
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());

            if (this.todolist[body.id]) {
                this.todolist[body.id] = body.todo;
            }

            response.write(this.getTodoJSON())
            response.end();
        });
    }
    
    deleteTodo(request, response) { 
        request.addListener("data", (data) => {
            const body = JSON.parse(data.toString());

            if (this.todolist[body.id]) {
                this.todolist.splice(body.id, 1);
            }

            response.write(this.getTodoJSON())
            response.end();
        });
    }

}