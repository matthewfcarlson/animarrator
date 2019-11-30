<template>
  <div class="container">
    <h1>My Projects</h1>
    <div v-if="loading">Loading your project...</div>
    <div v-else>
      <ul class="list-group">
        <li
          class="list-group-item list-group-item-action"
          v-for="project in projects"
          :key="project.id"
          @click="LoadProject(project.id)"
        >
          {{project.name}}
          <span class="badge badge-pill badge-primary pull-right">{{project.duration}}</span>
        </li>

        <p
          v-if="projects.length == 0"
        >Looks like you don't have any projects. You'll need to create a new project.</p>
      </ul>
      <p>Create a new project by selecting a new audio file</p>
      <AudioFormInput v-model="file" />
      <div class="alert alert-danger" v-if="error && file">{{error}}</div>
      <button class="btn btn-success" @click="CreateProject" v-if="file">Create Project</button>
    </div>
    <br />
    <br />
    <br />
  </div>
</template>

<script lang="ts">
//TODO make sure that this is at the bottom of the screen?
import { Component, Vue } from 'vue-property-decorator';
import AudioFormInput from './AudioFormInput';
import { AnimationDirector } from '../director';
import { StorageEngine } from '../storage';

@Component({
  components: {
    AudioFormInput
  }
})
export default class ProjectViewer extends Vue {
  file: Blob | null = null;
  loading = false;
  error: string | boolean = false;
  projects = StorageEngine.projectList;

  async CreateProject() {
    if (this.file == null) return;
    console.log(this.file);
    this.loading = true;
    const reader = new FileReader();
    const self = this;
    reader.onload = async (event: any) => {
      if (event == null || event.target == null) return;
      try {
        //TODO get file name
        console.log(event.target.result);
        const listing = StorageEngine.CreateProjectListing('temp');

        const success = await AnimationDirector.LoadAudio(event.target.result);
        if (!success) {
          self.error = 'Unable to load';
          self.loading = false;
          return;
        }
        AnimationDirector.SetProject(listing);

        self.LoadedProject();
        self.loading = false;
      } catch (e) {
        self.loading = false;
        console.log(e);
        self.error = "Was that an audio file? We couldn't read it";
      }
    };

    reader.onerror = () => {
      self.loading = false;
      self.error = 'An error ocurred reading the file';
    };

    // Read File as an ArrayBuffer
    reader.readAsArrayBuffer(this.file);
  }
  ImportProject() {
    // A user has a url or JSON file that we need to pass into the director
  }
  LoadProject(id: string) {
    // Try to load a project from storage?
    // Reset the directory
    // First try to load the audio into the director
    // If we are successful, emit a click
    console.log('Trying to load a project from storage ', id);
    StorageEngine.LoadProject(id);
  }
  LoadedProject() {
    this.$emit('click');
  }
}
</script>

<style scoped lang="scss">
</style>
