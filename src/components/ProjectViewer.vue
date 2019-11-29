<template>
  <div class="container">
    <h1>My Projects</h1>
    <div v-if="loading">
      Loading your project...
    </div>
    <div v-else>
      <p> Looks like you don't have any projects. Start by loading an audio file </p>
      <AudioFormInput v-model="file" />
      <p v-if="file">{{file.name}}</p>
      <div class="alert alert-danger" v-if="error && file">{{error}}</div>
      <button class="btn btn-success" @click="CreateProject" v-if="file">Create Project</button>
    </div>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script lang="ts">
//TODO make sure that this is at the bottom of the screen?
import { Component, Vue } from 'vue-property-decorator';
import AudioFormInput from './AudioFormInput';
import { AnimationDirector } from '../director';

@Component({
  components: {
    AudioFormInput
  }
})
export default class ProjectViewer extends Vue {
  file: Blob | null = null;
  loading = false;
  error: string | boolean = false;
  async CreateProject () {
    if (this.file == null) return;
    console.log(this.file);
    this.loading = true;
    const reader = new FileReader();
    const self = this;
    reader.onload = async (event:any) => {
      if (event == null || event.target == null ) return;
      try {
        await AnimationDirector.LoadAudio(event.target.result);

        self.LoadedProject();
        self.loading = false;
      }
      catch (e){
        self.loading = false;
        console.log(e);
        self.error = "Was that an audio file? We couldn't read it";
      }
    }
    
    reader.onerror =  () => {
        self.loading = false;
        self.error = "An error ocurred reading the file";
    };

    // Read File as an ArrayBuffer
    reader.readAsArrayBuffer(this.file);
  }
  ImportProject () {
    // A user has a url or JSON file that we need to pass into the director
  }
  LoadProject() {
    // Try to load a project from storage?
    // Reset the directory
    // First try to load the audio into the director
    // If we are successful, emit a click
    
  }
  LoadedProject() {
    this.$emit("click");

  }
}
</script>

<style scoped lang="scss">
</style>
