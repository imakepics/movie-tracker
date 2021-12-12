<template>
  <v-row justify="center">
      <v-col v-for="movie in watchedMovies" :key="movie.imdbID" cols="auto">
        <movie-card
          :movie="movie"
          isMarked
        />
      </v-col>
    </v-row>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";

export default {
  name: "SearchMovies",
  components: {
    MovieCard,
  },
  data() {
    return {
      watchedMovies: [],
    };
  },
  mounted() {
    if (localStorage.movies) {
      this.watchedMovies = JSON.parse(localStorage.movies);
    }
  },
};
</script>

