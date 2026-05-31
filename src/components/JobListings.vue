<script setup>
import { reactive, defineProps, onMounted } from 'vue'
import JobListing from '@components/JobListing.vue'
import {RouterLink} from 'vue-router'
import { PulseLoader } from 'vue3-spinner'
import axios from 'axios'

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})

const state = reactive({
    jobs: [],
    isLoading: true
})

onMounted(async() => {
    try {
        const response = await axios.get('/api/jobs')
        state.jobs = response.data
    } catch (err) {
        console.error('error fetching jobs', err)
    } finally {
        state.isLoading = false
    }
})

</script>

<template>
    
    <section class="bg-blue-50 px-6 py-10 mb-12 ">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-12 text-center">
                Browse Jobs
            </h2>
            <!--Show loading spinner while loading is true-->
            <div v-if="state.isLoading" class="text-center text-gray-700 py-6">
                <PulseLoader />
            </div>

            <!--Show joblisting when done loading-->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" 
                :key="job.id" 
                :job="job"/>
            </div>
        </div>
    </section>
    <div class="flex w-full justify-center">
    <section v-if="showButton" class="block w-full mx-auto max-w-lg my-10 px-6">
      <RouterLink
        to="/jobs"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</RouterLink
      >
    </section>
    </div>
</template>