<template>
  <v-card>
    <v-img :src="movie.Poster" height="200px"></v-img>

    <v-card-title>
      {{ movie.Title }}
    </v-card-title>
    <v-row>
      <v-col>
        <v-card-subtitle> {{ movie.Type }}, {{ movie.Year }} </v-card-subtitle>
      </v-col>
      <v-col cols="auto">
        <v-card-actions>
          <v-btn icon @click="showMore">
            <v-icon>{{
              isMoreInfoActive ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>

    <v-expand-transition>
      <div v-show="isMoreInfoActive">
        <v-divider></v-divider>
        <v-card-text>
          {{ _moreInfo }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="setWatched(movie)">
            Mark the movie as watched
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import axios from "axios";
import env from "@/env";

export default {
  name: "MovieCard",
  props: {
    movie: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    isMoreInfoActive: false,
    moreInfo: "",
    watchedMovies: [],
  }),
  computed: {
    _moreInfo() {
      if (this.moreInfo.Plot === "N/A") {
        return "Ooops! There is no description for this film";
      } else {
        return this.moreInfo.Plot;
      }
    },
  },
  methods: {
    async getMoreInfo(id) {
      console.log("id", id);
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${env.apikey}&i=${id}&plot=full`
        );
        console.log("response.data", response.data);
        this.moreInfo = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    showMore() {
      this.isMoreInfoActive = !this.isMoreInfoActive;
      this.getMoreInfo(this.movie.imdbID);
    },
    setWatched(value) {
      this.$emit('onClick:watched', value)
      this.isMoreInfoActive = false;
    },
  },
};
</script>
