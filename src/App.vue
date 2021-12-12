<template>
  <v-app>
    <!-- #region [header] -->
    <header>
      <router-link to="/">
        <v-img
          class="mb-12"
          height="3rem"
          contain
          src="@/assets/img/movieXmood-logo.svg"
        />
      </router-link>
    </header>
    <!-- #endregion-->
    <!-- #region [nav] -->
    <div id="nav" class="text-center mb-12">
      <router-link :to="{ name: 'search-movies' }"> Search Movies</router-link>
      <span class="px-2 px-sm-4">|</span>
      <router-link :to="{ name: 'watched-movies' }">Watched Movies</router-link>
    </div>
    <!-- #endregion-->
    <!-- #region [main] -->
    <v-main>
      <router-view />
    </v-main>
    <!-- #endregion-->
  </v-app>
</template>
