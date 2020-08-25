<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-container>
  </v-content>
</template>

<script>
export default {};
</script>

<style></style>
