<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let teams = ref([
  { name: 'De Badeendjes', score: 0 },
  { name: 'De Holle Bolle Gijsjes', score: 0 },
  { name: 'De Koele Kikkers', score: 0 },
  { name: 'De Zwemmende Zwanen', score: 0 },
]);

//const socket = new WebSocket('ws://localhost:3000/primus');
socket = new WebSocket('wss://labo6-frontend.onrender.com/primus')

onMounted(() => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.action === 'updateStats') {
        const teamToUpdate = teams.value.find((team) => team.name === data.team);
        if (teamToUpdate) {
            teamToUpdate.score = data.score;
        }
    }
  };
});
const goToRanking = () => {
  router.push('/');
};
</script>

<template>
  <div>
    <h1>Scoreboard</h1>
    <button @click="goToRanking">Go to Ranking</button>
    <ul>
      <li v-for="team in teams" :key="team.name">
        {{ team.name }} - {{ team.score }}
      </li>
    </ul>
  </div>
</template>

