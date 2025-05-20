<script setup>
import Header from "./components/Header.vue";
import TaskAdd from "./components/TaskAdd.vue";
import TaskList from "./components/TaskList.vue";
import TaskFilter from "./components/TaskFilter.vue";
import { useTask } from "./stores/TaskStore.js";

const store = useTask();

store.getTasks();

</script>

<template>
  <div class="max-h-screen bg-gray-200 h-screen flex items-center flex-col">
    <div class="max-w-xl w-full mt-60" v-if="store.isLoading">
      <div class="flex justify-center items-center">
        <svg
          class="animate-spin h-10 w-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4.93 4.93a10 10 0 0 1 14.14 14.14A10 10 0 0 1 4.93 4.93z"
          ></path>
        </svg>
      </div>

    </div>
    <div v-else class="max-w-xl w-full mt-60">
      <Header />
      <div class="bg-white shadow rounded p-5">
        <TaskAdd />
        <TaskList />
        <TaskFilter /> 
      </div>
    </div>
  </div>
</template>


