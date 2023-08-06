<template>
  <div class="max-w-prose mx-auto p-10 my-10 rounded overflow-hidden shadow-lg" data-cy="todo-list">
    <h1 class="font-sans font-bold text-lg">TO-DO LIST</h1>
    <div>
      <CreateTodo />
      <div class="flex justify-end shadow-sm pb-3">
        <button class="p-2 bg-gray-500 text-white rounded mt-3" data-cy="toggle-view" @click="toggleView">
          {{ isViewingCompleted ? 'View Pending Tasks' : 'View Completed Tasks' }}
        </button>
      </div>
    </div>
    <div>
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TodoItem from './TodoItem.vue';
import CreateTodo from './CreateTodo.vue';

export default {
  components: {
    TodoItem,
    CreateTodo,
  },
  data() {
    return {
      isViewingCompleted: false,
    };
  },
  computed: {
   ...mapGetters('todos', ['completedTodos', 'pendingTodos']),
  todos() {
    return this.isViewingCompleted ? this.completedTodos : this.pendingTodos;
  },
  },
  methods: {
    toggleView() {
        this.isViewingCompleted = !this.isViewingCompleted;
    },
  },
};
</script>
