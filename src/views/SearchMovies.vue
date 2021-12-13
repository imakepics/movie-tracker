<template>
  <div>
    <!-- #region [search-field] -->
    <v-row class="flex-column no-gutters" align="center">
      <div class="mb-4">Find movie for your mood</div>
      <v-col cols="12" sm="6" md="3" class="mb-4">
        <search-field
          v-model="_search"
          isAutofocus
          isClearable
          label="Search"
        />
      </v-col>
    </v-row>
    <!-- #endregion-->
    <!-- #region [movie-card] -->
    <v-row v-if="!movies && search" class="no-gutters" justify="center">
      No items matching your search criteria were found
    </v-row>
    <v-row v-else justify="center">
      <v-col v-for="movie in movies" :key="movie.imdbID" cols="auto">
        <movie-card :movie="movie" @onClick:watched="saveWatched" />
      </v-col>
    </v-row>
    <!-- #endregion-->
  </div>
</template>

<script>
import axios from "axios";
import env from "@/env";
import MovieCard from "@/components/MovieCard.vue";
import SearchField from "@/components/SearchField.vue";

export default {
  name: "SearchMovies",
  components: {
    MovieCard,
    SearchField,
  },
  data() {
    return {
      movies: [],
      search: "",
      watchedMovies: [],
    };
  },
  computed: {
    _search: {
      get() {
        return this.search;
      },
      set(value) {
        this.search = value;
        this.getMoviesContent();
      },
    },
  },
  watch: {
    watchedMovies: {
      handler(movies) {
        localStorage.movies = JSON.stringify(movies);
      },
      deep: true,
    },
  },
  methods: {
    async getMoviesContent() {
      if(this.search === null) {
        return;
      }
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${env.apikey}&s=${this.search}`
        );
        this.movies = response.data.Search;
      } catch (error) {
        console.log(error);
      }
    },
    saveWatched(value) {
      if (this.watchedMovies.includes(value)) {
        return;
      }
      this.watchedMovies.push(value);
    },
  },
};
</script>
