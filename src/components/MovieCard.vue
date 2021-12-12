<template>
  <v-card class="movie-card" width="344">
    <v-img :src="movie.Poster" height="200px"></v-img>
    <!-- #region [title] -->
    <v-card-title class="movie-card__title text-uppercase pb-0">
      {{ movie.Title }}
    </v-card-title>
    <!-- #endregion-->
    <v-row class="no-gutters" align="center">
      <!-- #region [subtitle] -->
      <v-col class="mb-4">
        <v-card-subtitle class="py-0">
          {{ movie.Type }}, {{ movie.Year }}
        </v-card-subtitle>
      </v-col>
      <!-- #endregion-->
      <!-- #region [more info button] -->
      <v-col cols="auto" class="mb-4">
        <v-card-actions class="pa-0 mr-4">
          <v-btn icon @click="showMore">
            <v-icon>{{
              isMoreInfoActive ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
      <!-- #endregion-->
    </v-row>
    <!-- #region [more info] -->
    <v-expand-transition>
      <div v-show="isMoreInfoActive">
        <v-divider></v-divider>
        <v-card-text>
          {{ _moreInfo }}
        </v-card-text>
        <v-card-actions v-if="!isMarked">
          <v-btn color="primary" text @click="setWatched(movie)">
            Mark as watched
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
    <!-- #endregion-->
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
    isMarked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMoreInfoActive: false,
      moreInfo: "",
      watchedMovies: [],
    };
  },
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
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${env.apikey}&i=${id}&plot=full`
        );
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
      this.$emit("onClick:watched", value);
      this.isMoreInfoActive = false;
    },
  },
};
</script>
