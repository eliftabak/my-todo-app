<template>
  <div data-cy="todo-item" class="flex flex-col md:flex-row items-center justify-between p-5 bg-white shadow-sm rounded-md mb-4">
    <div v-if="editing" data-cy="editing-mode" class="flex-grow">
      <input v-model="newTitle" data-cy="new-text" type="text" class="mr-5 my-2 p-2 bg-gray-200 rounded-md" />
      <input v-model="newDueDate" data-cy="new-date" type="date" class="p-2 mb-3 bg-gray-200 rounded-md" />
    </div>
    <div v-else class="flex-grow">
      <input type="checkbox" :checked="todo.completed" class="mr-5" @click="toggleTodo" />
      <span :class="{'line-through': todo.completed, 'bg-red-200': isPastDue}" class="p-2 rounded">
        {{ todo.title }} - {{ todo.dueDate }}
      </span>
    </div>
    <div v-if="editing">
      <button data-cy="save" class="ml-5 p-2 bg-green-500 text-white rounded-md" @click="saveChanges">Save</button>
      <button data-cy="cancel" class="ml-2 p-2 bg-red-500 text-white rounded-md" @click="cancelChanges">Cancel</button>
    </div>
    <div v-else class="flex mt-5">
      <button data-cy="edit" class="ml-5 p-2 bg-blue-500 text-white rounded-md" @click="startEditing">Edit</button>
      <button data-cy="duplicate" class="ml-2 p-2 bg-yellow-500 text-white rounded-md" @click="duplicateTodo">Duplicate</button>
      <button data-cy="delete" class="ml-2 p-2 bg-red-500 text-white rounded-md" @click="deleteTodo">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['todo'],
  data() {
    return {
      editing: false,
      newTitle: '',
      newDueDate: '',
    };
  },
  computed: {
    isPastDue() {
      return !this.todo.completed && new Date(this.todo.dueDate) < new Date();
    },
  },
  methods: {
    toggleTodo() {
      this.$store.commit('todos/toggleTodo', this.todo.id);
    },
    deleteTodo() {
      this.$store.commit('todos/removeTodo', this.todo.id);
    },
    duplicateTodo() {
      this.$store.commit('todos/addTodo', {
        id: Date.now(),
        title: this.todo.title,
        dueDate: this.todo.dueDate,
        completed: this.todo.completed,
      });
    },
    startEditing() {
      this.editing = true;
      this.newTitle = this.todo.title;
      this.newDueDate = this.todo.dueDate;
    },
    saveChanges() {
      this.$store.commit('todos/updateTodo', {
        id: this.todo.id,
        title: this.newTitle,
        dueDate: this.newDueDate,
        completed: this.todo.completed,
      });
      this.editing = false;
    },
    cancelChanges() {
      this.editing = false;
    },
  },
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
