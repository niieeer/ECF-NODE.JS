<template>
  <div class="main">
    <!-- Ecouteur sut l'input pour capturer les données saisi -->
    <input type="search" placeholder="Search for a user" minlength="1" maxlength="15" v-model="userSearch.search"
      @keyup="searchAndDisplayDebounced">
    <table>
      <tr>
        <th>ID</th>
        <th>USERNAME</th>
        <th>EMAIL</th>
        <th>ROLE</th>
      </tr>
      <!-- Affichage du résultat -->
      <tr v-for="user in store.user" :key="user.id">
        <td class="px2">{{ user.id }}</td>
        <td class="px2">{{ user.name }}</td>
        <td class="px2">{{ user.email }}</td>
        <td class="px2">{{ user.role }}</td>
      </tr>
    </table>
    <transition name="notif">
      <div v-if="store.response?.length > 1" class="error">{{ store.response }}</div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useMainStore } from "../../stores/main";
import { useErrorStore } from "../../stores/error";


axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

// Appel du store
const store = useMainStore()
const storeErr = useErrorStore()

// Si jamais il y'a un soucis est que le store est vide je le remplis à nouveau avec un store de tout les users
const userSearch = {
  search: ''
}

//  * Retourne une fonction qui, tant qu'elle continue à être invoquée,
//  * ne sera pas exécutée. La fonction ne sera exécutée que lorsque
//  * l'on cessera de l'appeler pendant plus de N millisecondes.

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Fonction qui va recuperer les entrés de l'utilisateur
// et qui va avec ces dernies envoyé une requete à l'api 
const searchUserApi = () => {
  const regex = /^[0-9]+$/

  if (store.user.length <= 0) {
    // Oui le nom est un peu confus 
    store.user = store.users    
  }

  if (typeof userSearch.search !== "string" || userSearch.search.length > 15 || regex.test(userSearch.search)) {
    return
  }

  // On retire les espaces en trop
  userSearch.search = userSearch.search.replace(/\s/g, "");
  const data = {
    data: userSearch.search.trim()
  }

  // La requete vers l'api
  axios
    .post("http://127.0.0.1:8000/users", data)
    .then((response) => {
      // Enregistrement des données que si c'est "ok" coté server
      if (response.status == 200) {
        store.user = response?.data
      }
    });
}

// Fonction search sous l'effet du debounce
const searchAndDisplayDebounced = debounce(
  searchUserApi,
  800,
  false
);

</script>

<style scoped>
input {
  padding: 1rem;
  margin: 1rem;
}

.px2 {
  padding: 0 2rem;
}

.error {
  padding: 1rem;
  border-radius: 1rem;
  background-color: cornflowerblue;
}

.notif-enter-from {
  opacity: 0;
}

.notif-enter-to {
  opacity: 1;
}

.notif-enter-active {
  transition: opacity 3s ease;
}

.notif-leave-from {
  opacity: 1;
}

.notif-leave-to {
  opacity: 0;
}

.notif-leave-active {
  transition: opacity 3s ease;
}
</style>
