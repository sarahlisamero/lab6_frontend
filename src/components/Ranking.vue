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
let socket = null;

onMounted(() => {
  console.log('mounted');
  // connect to the WebSocket server
  socket = new WebSocket('ws://localhost:3000/primus');

  // listen to messages from the WebSocket server
  socket.onmessage = (event) => {
    console.log(event.data);
    let newData = JSON.parse(event.data);
    console.log('Received message:', newData);
    if (newData.action === 'updateStats') {
      const teamToUpdate = teams.value.find((team) => team.name === newData.team);
      if (teamToUpdate) {
        teamToUpdate.score = newData.score;
      }
    }
  };
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
  // reset input values
  selectedTeam.value = '';
  score.value = 0;
};

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
