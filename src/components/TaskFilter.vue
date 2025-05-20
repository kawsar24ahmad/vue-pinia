<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useTask } from "../stores/TaskStore.js";

const store = useTask();
const {sortable, allTaskCount, completedTaskCount, pendingTaskCount} = storeToRefs(store);
</script>

<template>

  <div class="flex justify-end text-gray-500 mt-5">
    <div class="flex space-x-2">
      <label class="inline-flex items-center">
        <input type="radio" name="sortable" v-model="sortable"  class="h-4 w-4 text-blue-500" value="all" />
        <span class="ml-2 text-sm">All ({{ allTaskCount }})</span>
      </label>
      <label class="inline-flex items-center">
        <input type="radio" name="sortable" v-model="sortable"  class="h-4 w-4 text-blue-500" value="completed" />
        <span class="ml-2 text-sm"
          >Completed ({{ completedTaskCount }})</span
        >
      </label>
      <label class="inline-flex items-center">
        <input type="radio" name="sortable" v-model="sortable"  class="h-4 w-4 text-blue-500" value="pending" />
        <span class="ml-2 text-sm">Pending ({{ pendingTaskCount }})</span>
      </label>
    </div>
  </div>
</template>