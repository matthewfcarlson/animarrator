<template>
  <div id="app" class="container-fluid" style="background-color:white">
    <NavBar />
    <Studio />
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "./components/NavBar.vue";
import Studio from "./components/Studio.vue";
import Footer from "./components/Footer.vue";

@Component({
  components: {
    NavBar,
    Studio,
    Footer
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import './scss/custom.scss';
</style>