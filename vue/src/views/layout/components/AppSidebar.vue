<template>
  <v-navigation-drawer :value="isMenuOpen"  app  width="232" clipped="clipped">
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "AppSideBar",
  data() {
    return {
      items: [
        { title: "首页", icon: "mdi-view-dashboard" },
        { title: "文章列表", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
    };
  },
  computed: {
    isMenuOpen: function(){
      const {isMenuOpen} = this.$store.getters
      return  isMenuOpen
    }
  },
};
</script>

<style></style>
