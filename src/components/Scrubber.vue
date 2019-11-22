<template>
  <div class="bg-info text-center escape-gutters row">
    <div class="col-lg-1 text-left">
      <i
        class="fas fa-play fa-2x btn-scrub"
        v-if="!isPlaying"
        @click="play"
        title="Plays the animation"
      ></i>
      <i class="fas fa-pause fa-2x btn-scrub" v-else @click="pause" title="Pauses playback"></i>
      <i
        class="fas fa-stop fa-2x btn-scrub"
        @click="stop"
        title="Stops playback and resets to beginning"
      ></i>
    </div>
    <div class="col-lg-2 text-center">
      {{scrubTime}} / {{maxScrubTime}}
      <br />
      <i
        class="far fa-caret-square-left btn-scrub"
        @click="prev"
        title="Goes to the previous scene"
      ></i>
      Scene {{currentScene}} of {{maxScene}}
      <i
        class="far fa-caret-square-right btn-scrub"
        @click="next"
        title="Goes to the next scene"
      ></i>
    </div>
    <div class="col-lg-8 text-center">Scrubber goes here</div>
    <div class="col-lg-1 text-center">Buttons? Load sound?</div>
  </div>
</template>

<script lang="ts">
//TODO make sure that this is at the bottom of the screen?
import { Component, Vue } from 'vue-property-decorator';
import { AnimationDirector } from '../director';

@Component
export default class Scrubber extends Vue {
  isPlaying = false;
  director = AnimationDirector.Instance;

  get scrubTime() {
    const milliseconds = this.director.CurrentScrubTime;
    const total_seconds = milliseconds / 1000;
    const minutes = Math.floor(total_seconds / 60);
    const seconds = Math.floor(total_seconds - minutes * 60);
    const second_str = String(seconds).padStart(2, '0');
    console.log('ScrubTime ', milliseconds);
    return String(minutes) + ':' + second_str;
  }
  get currentScene() {
    return this.director.CurrentScene;
  }
  get maxScene() {
    return this.director.MaxScenes;
  }
  get maxScrubTime() {
    const milliseconds = this.director.MaxScrubTime;
    const total_seconds = milliseconds / 1000;
    const minutes = Math.floor(total_seconds / 60);
    const seconds = Math.floor(total_seconds - minutes * 60);
    const second_str = String(seconds).padStart(2, '0');
    return String(minutes) + ':' + second_str;
  }
  // Play
  play() {
    //TODO reach out to animation director
    console.log('Playing');
    this.isPlaying = true;
    // TODO should I be using vuex?
    this.director.Play();
  }
  // Pause playback
  pause() {
    console.log('Pausing');
    this.isPlaying = false;
    // TODO should I be using vuex?
    this.director.Pause();
  }
  // Stop playback
  stop() {
    console.log('Stopping');
    this.isPlaying = false;
    // TODO should I be using vuex?
    this.director.Stop();
  }
  // Go to the next section
  next() {
    this.director.Pause();
    this.director.NextSection();
  }
  // Go to the previous section
  prev() {
    this.director.Pause();
    this.director.PrevSection();
  }
}
</script>

<style scoped lang="scss">
.btn-scrub:hover {
  color: wheat;
}
</style>
