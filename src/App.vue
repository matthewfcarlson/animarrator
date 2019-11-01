<template>
  <div id="app" class="container-fluid" style="background-color:white">
    <NavBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "./components/NavBar.vue"; // @ is an alias to /src

@Component({
  components: {
    NavBar,
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import './scss/custom.scss';
</style>