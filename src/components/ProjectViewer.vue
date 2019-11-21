<template>
  <div class="container">
    <h1>My Projects</h1>
    <AudioFormInput v-model="file" />
    <p v-if="file">{{file.name}}</p>
  </div>
</template>

<script lang="ts">
//TODO make sure that this is at the bottom of the screen?
import { Component, Vue } from 'vue-property-decorator';
import AudioFormInput from './AudioFormInput';

@Component({
  components: {
    AudioFormInput
  }
})
export default class ProjectViewer extends Vue {
  file: File | null = null;
  ImportProject () {
    // A user has a url or JSON file that we need to pass into the director
  }
  LoadProject() {
    // Reset the directory
    // First try to load the audio into the director
    // If we are successful, emit a click
    this.$emit("click");

  }
}
</script>

<style scoped lang="scss">
</style>
