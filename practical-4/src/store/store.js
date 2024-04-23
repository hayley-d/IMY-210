import {defineStore} from 'pinia';
//Hayley Dodkins u21528790
export const useStore = defineStore('todos', {
    state: () => ({
        users: [],
        todos: [],
        userId: null,
        posts: []
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await fetch('http://localhost:3000/users');
                this.users = await response.json();
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async fetchUser(userId) {
            try {
                const response = await fetch(`http://localhost:3000/user/user_id=${userId}`);
                this.userId = await response.json();
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async fetchPosts(userId) {
            try {
                const response = await fetch(`http://localhost:3000/posts/user_id=${userId}`);
                this.posts = await response.json();
                this.userId = userId;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async fetchTodos(userId) {
            try {
                const response = await fetch(`http://localhost:3000/todos/user_id=${userId}`);
                this.todos = await response.json();
                this.userId = userId;
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        },
        async createPost(userId, title, body) {
            try {
                const response = await fetch('http://localhost:3000/posts', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, title, body }),
                });

                if (!response.ok) {
                    throw new Error(`Error creating post: ${response.statusText}`);
                }

                const newPost = await response.json();
                this.posts.push(newPost);
                return newPost;
            } catch (error) {
                console.error('Error creating post:', error);
                return null;
            }
        },
        async patchTodo(todoId) {
            try {
                const todo = this.todos.find(item => item.id === todoId);
                if (!todo) {
                    throw new Error('Todo not found');
                }

                const isAlreadyCompleted = todo.completed;
                if (isAlreadyCompleted) {
                    return todo;
                }

                const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: true }),
                });

                if (!response.ok) {
                    throw new Error(`Error patching todo: ${response.statusText}`);
                }

                const updatedTodo = await response.json();
                this.todos = this.todos.map(item => (item.id === updatedTodo.id ? updatedTodo : item));
                return updatedTodo;
            } catch (error) {
                console.error('Error patching todo:', error);

                return null;
            }
        },
        async deleteTodo(todoId) {
            try {
                const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Error deleting todo: ${response.statusText}`);
                }

                const data = await response.json();
                if (data.success) {
                    this.todos = this.todos.filter(todo => todo.id !== todoId);
                    return true;
                } else {
                    throw new Error('Deletion failed (no success in response)');
                }
            } catch (error) {
                console.error('Error deleting todo:', error);
                return false;
            }
        },
        async deletePost(postId) {
            try {
                const response = await fetch(`http://localhost:3000/posts/${postId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`Error deleting post: ${response.statusText}`);
                }

                const data = await response.json();
                if (data.success) {
                    this.posts = this.posts.filter(post => post.id !== postId);
                    return true;
                } else {
                    throw new Error('Deletion failed (no success in response)');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                return false;
            }
        },
    },
});