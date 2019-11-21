<template>
  <div class="container">
    <h1>Getting Started</h1>
    <button class="btn btn-block btn-success" @click="goToProject">Start a Project</button>
  </div>
</template>

<script lang="ts">
//TODO make sure that this is at the bottom of the screen?
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  }
})
export default class GettingStarted extends Vue {
  goToProject() {
      this.$emit('click');
  }
}
</script>

<style scoped lang="scss">
</style>
