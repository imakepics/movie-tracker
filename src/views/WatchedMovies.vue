<template>
  <v-row>
      <v-col v-for="movie in watchedMovies" :key="movie.imdbID" cols="auto">
        <movie-card
          :movie="movie"
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
      movies: undefined,
      search: undefined,
      watchedMovies: [],
    };
  },
  computed: {
  },
  mounted() {
   //console.log("watchedMovies mounted", this.watchedMovies);
    if (localStorage.movies) {
      this.watchedMovies = JSON.parse(localStorage.movies);
      console.log("this.watchedMovies mounted", this.watchedMovies);
    }
  },
 
  methods: {
  }
};
</script>

