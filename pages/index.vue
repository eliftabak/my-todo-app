<template>
  <div>
    <TodoList />
  </div>
</template>

<script>
import TodoList from '~/components/TodoList.vue';

export default {
  components: {
    TodoList,
  },
  data() {
    return {
      isViewingCompleted: false,
    };
  },
  mounted() {
    this.$store.dispatch('todos/loadTodos');
  },
};
</script>
