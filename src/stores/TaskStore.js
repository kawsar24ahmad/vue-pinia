import axios from 'axios';
import { defineStore } from 'pinia'
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

export const useTask = defineStore('tasks', {
    state:() => {
        return {
            tasks: [],
            sortable:"all",
            isLoading:false,
            errors:[],
        }
    },
    getters:{
        filteredTask(){
            if (this.sortable == 'all') {
                return this.allTask;
            }
            if (this.sortable == 'completed') {
                return this.completedTask;
            }
            if (this.sortable == 'pending') {
                return this.pendingTask;
            }
        },
        allTask(){
            return this.tasks;
        },
        completedTask(){
            return this.tasks.filter(task => task.completed);
        },
        pendingTask(){
            return this.tasks.filter(task => !task.completed);
        },

        allTaskCount(){
            return this.tasks.length
        },
        completedTaskCount(){
            return this.tasks.filter(task => task.completed).length
        },
        pendingTaskCount(){
            return this.tasks.filter(task => !task.completed).length
        },
    },
    actions:{
        removeErrors(){
            this.errors = []
        },
        async getTasks(){
            try {
                this.isLoading = true;
                // await axios.get('/sanctum/csrf-cookie');
                let response = await axios.get('/api/tasks');
                this.tasks = response.data;
                this.isLoading = false;
            } catch (error) {
                console.log(error);
                
            }
        },
        async addTask(task){
            try {
                let response =  await axios.post('/api/tasks', task)
                this.tasks.push(response.data)
                $toast.success('Task added successfully')
            } catch (error) {
                // error
                if (error.status === 422  ) {
                    this.errors = error.response.data.errors
                    $toast.error('Please fill all fields')
                }
                
            }
        },
        async deleteTask(id){
            try {
                await axios.delete(`/api/tasks/${id}`)
                this.tasks = this.tasks.filter(task => task.id !== id)  
                $toast.success('Task deleted successfully')
            } catch (error) {
                
            }          
        },
        async handleToggle(id){
              
            try {
                await axios.patch(`/api/tasks/${id}`);
                const task = this.tasks.find(task => task.id === id);
                task.completed = !task.completed;  
                $toast.success('Task updated successfully')
            } catch (error) {
                
            }        
        }
    }
})