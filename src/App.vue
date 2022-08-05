<template>
  <IndexPage />
</template>

<script>
import IndexPage from "./pages/IndexPage.vue";

export default {
  name: "App",
  components: {
    IndexPage,
  },
  mounted() {
    document.title = "Jesús Sánchez Carbonero";
  },
};
</script>

<style lang="scss">
@import "@/css/app.scss";
</style>
