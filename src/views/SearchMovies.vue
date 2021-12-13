<template>
  <div>
    <!-- #region [search-field] -->
    <v-row class="flex-column" align="center">
      <div class="mb-4">Find movie for your mood</div>
      <v-col cols="12" sm="6" md="3">
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
    <v-row justify="center" align="center">
      <v-progress-circular
        v-if="isLoading"
        size="64"
        color="primary"
        indeterminate
      />
      <v-row
        v-else
        :class="_noMoviesMessage ? 'mt-4' : 'mt-2'"
        justify="center"
        align="center"
      >
        <div v-if="!movies && search !== null">
          {{ _noMoviesMessage }}
        </div>
        <v-col
          v-else
          v-for="movie in movies"
          :key="movie.imdbID"
          cols="auto"
          class="pa-2"
        >
          <movie-card :movie="movie" @onClick:watched="saveWatched" />
        </v-col>
      </v-row>
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
      isLoading: false,
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
    _noMoviesMessage() {
      if (!this.movies && this.search?.length <= 2) {
        return "Your request is too short.";
      } else if (!this.movies && this.search?.length > 2) {
        return "No items matching your search criteria were found.";
      } else {
        return "";
      }
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
      if (this.search === null) {
        return;
      }
      try {
        this.isLoading = true;
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${env.apikey}&s=${this.search}`
        );
        this.movies = response.data.Search;
        this.isLoading = false;
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
