<template>
  <form
  class="md:flex md:items-center md:justify-between py-5 bg-white shadow-sm rounded-md"
  data-cy="todo-form"
  @submit.prevent="addTodo">
    <input
      v-model="title"
      type="text"
      data-cy="todo-text"
      placeholder="What needs to be done?"
      :class="{ error: titleError }"
      required
      class="flex-grow mr-5 mb-2 p-2 bg-gray-200 rounded-md"
    />
    <input
      v-model="dueDate"
      type="date"
      data-cy="date"
      :class="{ error: dateError }"
      required
      class="p-2 bg-gray-200 text-gray-400 rounded-md"
    />
    <button
      type="submit"
      data-cy="add"
      class="ml-5 p-2 bg-blue-500 text-white rounded-md"
    >
    <i class="fa-solid fa-plus"></i>
      Add
    </button>

    <div v-if="titleError" class="error-message" data-cy="error">Title is required</div>
    <div v-if="dateError" class="error-message" data-cy="error">Date is required</div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      dueDate: '',
      titleError: false,
      dateError: false,
    };
  },
  methods: {
    addTodo() {
      this.titleError = false;
      this.dateError = false;

      if (!this.title) this.titleError = true;
      if (!this.dueDate) this.dateError = true;

      if (this.titleError || this.dateError) return;

      this.$store.commit('todos/addTodo', {
        id: Date.now(),
        title: this.title,
        dueDate: this.dueDate,
        completed: false,
      });

      this.title = '';
      this.dueDate = '';
    },
  },
};
</script>
