<template>
  <div class="bg-info text-center escape-gutters row">
    <div class="col-lg-2 text-left">
      <i class="fas fa-play fa-2x" @click="play"></i>
      <i class="fas fa-pause fa-2x" @click="pause"></i>
      <i class="fas fa-stop fa-2x" @click="stop"></i>
    </div>
  </div>
</template>

<script lang="ts">
//TODO make sure that this is at the bottom of the screen?
import { Component, Vue } from 'vue-property-decorator';
import { AnimationDirector } from '../director';

@Component
export default class Scrubber extends Vue {
  play() {
    //TODO reach out to animation director
    console.log('Playing');
    // TODO should I be using vuex?
    AnimationDirector.Instance.Play();
  }
  pause() {
    console.log('Pausing');
    // TODO should I be using vuex?
    AnimationDirector.Instance.Pause();
  }
  stop() {
    console.log('Stopping');
    // TODO should I be using vuex?
    AnimationDirector.Instance.Stop();
  }
}
</script>

<style scoped lang="scss">
</style>
