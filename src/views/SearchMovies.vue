<template>
  <div>
    <div class="my-3">Find movie for your mood</div>
    <v-row>
      <v-col cols="3">
        <search-field
          v-model="_search"
          isClearable
          description="Description"
          label="Search"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="movie in movies" :key="movie.imdbID" cols="auto">
          <movie-card
            :movie="movie"
            @onClick:watched="saveWatched"
          />
      </v-col>
    </v-row>
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
      movies: undefined,
      search: undefined,
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
      //console.log(this.watchedMovies.some(value))
      if(this.watchedMovies.includes(value)) {
        return;
      }
        this.watchedMovies.push(value);
        console.log("watchedMovies", this.watchedMovies);
    }
  },
};
</script>
