<template>
  <div id="app" class="container-fluid" style="background-color:white">
    <NavBar />
    <Studio v-if="page == Page.Studio" />
    <div class="row" v-else-if="page == Page.Help">
      <h1>Help</h1>
      <button class="btn" @click="goToProject">Start</button>
    </div>
    <div v-else-if="page == Page.GettingStarted">
      <h1>Getting Started</h1>
      <button class="btn" @click="goToHelp">Help</button>
      <button class="btn" @click="goToProject">Start</button>
    </div>
    <div v-else-if="page == Page.LoadProject">
      <h1>Load a Project</h1>
      <ProjectViewer />
      <button class="btn" @click="goToStudio">Start</button>
    </div>
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

enum Page {
  Help = 1,
  LoadProject,
  GettingStarted,
  Studio
}

@Component({
  components: {
    NavBar,
    Studio,
    Footer,
    ProjectViewer
  }
})
export default class App extends Vue {
  page: Page = Page.GettingStarted;
  Page = Page; // ugly but works

  goToHelp() {
    this.page = Page.Help;
  }
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