<script setup>
import { ref } from "vue";
import { useTask } from "../stores/TaskStore.js";

const store = useTask();

const task = ref("");
const addTask = () => {
  let newTask = {
    id: Date.now(),
    title: task.value,
    completed: false,
  };
  // console.log(newTask);
  task.value = "";
  store.addTask(newTask);
};
const handleChange = (e) => {
  if (e.data) {
    store.removeErrors()
  }
  
} 
</script>

<template>
  <form @submit.prevent="addTask" class="mb-10 flex space-x-4">
    <div class="w-full">
      <input
        type="text"
        v-model="task"
        @input="handleChange"
        name=""
        id=""
        class="w-full bg-gray-100 border border-gray-300 outline-gray-300 rounded py-1 px-3"
        placeholder="Add Something..."
      />
      <p class="text-red-400" v-if="store.errors.title">
        {{ store.errors.title[0] }}
      </p>
    </div>

    <button
      type="submit"
      class="text-white bg-indigo-500 border-0 py-2 px-8 rounded hover:bg-indigo-600 text-lg"
    >
      Add
    </button>
  </form>
</template>