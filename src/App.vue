<template>
  <v-app>
    <div id="nav">
      <router-link :to="{ name: 'search-movies' }">
        <v-img
          class="mb-12"
          height="2rem"
          contain
          src="@/assets/img/movieXmood-logo.svg"
        />
        Search Movies</router-link> |
      <router-link :to="{ name: 'watched-movies' }">Watched Movies</router-link>
    </div>
    <v-main>
    <router-view />
    </v-main>
  </v-app>
</template>



