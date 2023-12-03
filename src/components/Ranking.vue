<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let selectedTeam = ref('');
let score = ref(0);
let teams = ref([
  { name: 'De Badeendjes', score: 0 },
  { name: 'De Holle Bolle Gijsjes', score: 0 },
  { name: 'De Koele Kikkers', score: 0 },
  { name: 'De Zwemmende Zwanen', score: 0 },
]);
let socket = null;

onMounted(() => {
  socket = new WebSocket('ws://localhost:3000/primus');
  //socket = new WebSocket('wss://labo6-frontend.onrender.com/primus')
});

const updateStatistics = () => {
  // send message to WebSocket server
  socket.send(
    JSON.stringify({
      action: 'updateStats',
      team: selectedTeam.value,
      score: score.value,
    })
  );
  selectedTeam.value = '';
  score.value = 0;
};

const goToScoreboard = () => {
  router.push('/scoreboard');
};
</script>

<template>
  <div>
    <h1>Ranking</h1>
    <button @click="goToScoreboard">Go to Scoreboard</button>
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
