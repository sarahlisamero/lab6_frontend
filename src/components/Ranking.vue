<script setup>
import { ref, onMounted } from 'vue';

let selectedTeam = ref('');
let score = ref(0);
let teams = ref([
  { name: 'De Badeendjes', score: 0 },
  { name: 'De Holle Bolle Gijsjes', score: 0 },
  { name: 'De Koele Kikkers', score: 0 },
  { name: 'De Zwemmende Zwanen', score: 0 },
]);

</script>

<template>
  <div>
    <ul>
      <li v-for="team in teams" :key="team.name">
        {{ team.name }} - {{ team.score }}
      </li>
    </ul>
    <div>
      <label for="team">Select Team:</label>
      <select v-model="selectedTeam">
        <option v-for="team in teams" :key="team.name" :value="team.name">
          {{ team.name }}
        </option>
      </select>
      <label for="score">Enter Score:</label>
      <input v-model="score" type="number" />
      <button @click="updateStatistics">Update Statistics</button>
    </div>
  </div>
</template>

<style scoped>

</style>
