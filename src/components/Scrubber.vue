<template>
  <div class="bg-info text-center escape-gutters row">
    <div class="col-lg-1 text-left">
      <i class="fas fa-play fa-2x btn-scrub" v-if="!isPlaying" @click="play" title="Plays the animation"></i>
      <i class="fas fa-pause fa-2x btn-scrub" v-else @click="pause" title="Pauses playback"></i>
      <i class="fas fa-stop fa-2x btn-scrub" @click="stop" title="Stops playback and resets to beginning"></i>
    </div>
    <div class="col-lg-2 text-center">
      0:00 / 0:00
      <br/>
      <i class="far fa-caret-square-left btn-scrub" @click="prev" title="Goes to the previous scene"></i>
      Scene 0 of 0
      <i class="far fa-caret-square-right btn-scrub" @click="next" title="Goes to the next scene"></i>
    </div>
    <div class="col-lg-8 text-center">
      Scrubber goes here
    </div>
    <div class="col-lg-1 text-center">
      Buttons? Load sound?
    </div>
  </div>
</template>

<script lang="ts">
//TODO make sure that this is at the bottom of the screen?
import { Component, Vue } from 'vue-property-decorator';
import { AnimationDirector } from '../director';

@Component
export default class Scrubber extends Vue {
  isPlaying = false;
  // Play
  play() {
    //TODO reach out to animation director
    console.log('Playing');
    this.isPlaying = true;
    // TODO should I be using vuex?
    AnimationDirector.Instance.Play();
  }
  // Pause playback
  pause() {
    console.log('Pausing');
    this.isPlaying = false;
    // TODO should I be using vuex?
    AnimationDirector.Instance.Pause();
  }
  // Stop playback
  stop() {
    console.log('Stopping');
    this.isPlaying = false;
    // TODO should I be using vuex?
    AnimationDirector.Instance.Stop();
  }
  // Go to the next section
  next() {

  }
  // Go to the previous section
  prev () {

  }
}
</script>

<style scoped lang="scss">
.btn-scrub:hover {
  color:wheat;
}
</style>
