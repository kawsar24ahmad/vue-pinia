<script setup>
import Task from './Task.vue'
import { useTask } from '../stores/TaskStore.js'
import { storeToRefs } from 'pinia';

const store = useTask();
const {filteredTask} = storeToRefs(store);
</script>
<template>
  
        <div 
        class="flex border-t border-gray-200 py-2" 
        v-for="task in filteredTask" 
        :key="task.id"
        >
          <Task :task="task" />
        </div>
</template>