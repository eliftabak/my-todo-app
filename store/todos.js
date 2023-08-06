export const state = () => ({
  todos: [],
});

export const getters = {
  pendingTodos: state => state.todos.filter(todo => !todo.completed),
  completedTodos: state => state.todos.filter(todo => todo.completed)
};

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos;
  },
  addTodo(state, todo) {
    state.todos.push(todo);
    if (process.browser) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  },
  removeTodo(state, todoId) {
    state.todos = state.todos.filter((todo) => todo.id !== todoId);
    if (process.browser) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  },
  updateTodo(state, updatedTodo) {
    const todoIndex = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (todoIndex !== -1) state.todos.splice(todoIndex, 1, updatedTodo);
    if (process.browser) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  },
  toggleTodo(state, todoId) {
    const todoIndex = state.todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) state.todos[todoIndex].completed = !state.todos[todoIndex].completed;
    if (process.browser) {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  },
};

export const actions = {
  loadTodos({ commit }) {
    if (process.browser) {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      commit('setTodos', todos);
    }
  },
};
