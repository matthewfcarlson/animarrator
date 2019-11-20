<template>
  <div class>
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
}
</script>

<style scoped lang="scss">
</style>
