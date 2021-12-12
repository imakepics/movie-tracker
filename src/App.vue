<template>
  <v-app>
    <div id="nav">
      <router-link :to="{ name: 'home' }">
        <v-img
          class="mb-12"
          height="2rem"
          contain
          src="@/assets/img/movieXmood-logo.svg"
        />
        Home</router-link> |
      <router-link :to="{ name: 'about' }">About</router-link>
    </div>
    <v-main>
    <router-view />
    </v-main>
  </v-app>
</template>



