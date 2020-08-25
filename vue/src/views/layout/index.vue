<template>
    <v-app>
        <app-sidebar />
        <app-navbar />
        <AppMain />
    </v-app>
</template>

<script>
import AppSidebar from './components/AppSidebar.vue';
import AppMain from './components/AppMain.vue';
import AppNavbar from './components/AppNavbar.vue';

export default {
    components: {
        AppSidebar,
        AppMain,
        AppNavbar
    }
};
</script>

<style lang="scss" scoped>
div {
    color: red;
    p {
        color: #000;
    }
}
</style>
