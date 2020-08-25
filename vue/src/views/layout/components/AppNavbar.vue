<template>
  <v-app-bar
    app
    color="cyan"
    dark
    dense
    height="56"
    :clipped-left="true"
  >
    <v-app-bar-nav-icon @click.prevent="changeMenuStatus"></v-app-bar-nav-icon>
    <v-toolbar-title>Better Today</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AppNavbar",
  data(){
    return{
    }
  },
  methods:{
    ...mapActions({
      changeMenuStatus: "commonState/changeMenuStatus"
    }),
  }
};
</script>

<style></style>
