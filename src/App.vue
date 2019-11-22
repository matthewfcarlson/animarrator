<template>
  <div id="app" class="container-fluid" style="background-color:white">
    <NavBar />
    <Studio v-if="page == Page.Studio" />
    <GettingStarted v-else-if="page == Page.GettingStarted" @click="goToProject" />
    <ProjectViewer v-else-if="page == Page.LoadProject" @click="goToStudio"/>
    <div v-else>
      <h1>Error</h1>
      {{page}}
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from './components/NavBar.vue';
import Studio from './components/Studio.vue';
import Footer from './components/Footer.vue';
import ProjectViewer from "./components/ProjectViewer.vue";
import GettingStarted from "./components/GettingStarted.vue";

enum Page {
  GettingStarted = 1,
  LoadProject,
  Studio
}

@Component({
  components: {
    NavBar,
    Studio,
    Footer,
    ProjectViewer,
    GettingStarted
  }
})
export default class App extends Vue {
  page: Page = Page.LoadProject;
  Page = Page; // ugly but works

  goToProject() {
    this.page = Page.LoadProject;
  }
  goToStudio() {
    this.page = Page.Studio;
  }
}
</script>

<style lang="scss">
@import './scss/custom.scss';
</style>