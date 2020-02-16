new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data() {
        return {
            show: true,
            todoTitle: '',
            todos: []
        }
    },
    created() {
        this.$vuetify.theme.dark = true;

        fetch('/api/todo', {
            method: 'get',
        })
            .then(res => res.json())
            .then(({todos}) => {
                this.todos = todos;
            })
            .catch(e => console.log(e))
    },
    methods: {
        addTodo() {
            const title = this.todoTitle.trim();
            if (!title) return;
            fetch('/api/todo', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title})
            })
                .then(res => res.json())
                .then(({todo}) => {
                    this.todos.push(todo);
                    this.todoTitle = '';
                })
                .catch(e => console.log(e))
        },
        removeTodo(id) {
            fetch(`/api/todo/${id}`, {
                method: 'delete'
            })
                .then(() => {
                    this.todos = this.todos.filter((t) => t.id !== id);
                })
                .catch(e => console.log(e))
        },
        completeTodo(id) {
            fetch(`/api/todo/${id}`, {
                method: 'put'
            })
                .then(res => res.json())
                .then(({todo}) => {
                    this.todos = this.todos.map(t => t.id !== id
                        ? t
                        : todo)
                })
                .catch(e => console.log(e))
        }
    },
    filters: {
        capitalize(value) {
            return value.toString().charAt(0).toUpperCase() + value.slice(1);
        },
        date(value, withTime) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            };

            if (withTime) {
                options.hour = '2-digit';
                options.minute = '2-digit';
                options.second = '2-digit';
            }

            return new Intl.DateTimeFormat('en-En', options).format(new Date(value));
        }
    },
});