<template>
  <div class="bg-info text-center escape-gutters row">
    <div class="col-lg-1 text-left my-auto">
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
    <div class="col-lg-2 text-center my-auto">
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
    <div class="col-lg-8 text-center">
      <div
        class="scrubber"
        v-touch:moved="movedHandler"
        v-touch:moving="movingHandler"
        v-touch:start="startHandler"
        v-touch:end="endHandler"
      >
        <div class="time-bar" :style="timeIndicatorStyle"></div>
        <div class="time-indicator" :style="timeIndicatorStyle"></div>
        <i class="split"></i>
      </div>
    </div>
    <div class="col-lg-1 text-center my-auto">
      <i
        class="far fa-hand-scissors fa-2x btn-scrub"
        @click="split"
        title="Splits at the current time"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
//TODO make sure that this is at the bottom of the screen?
import { Component, Vue } from 'vue-property-decorator';
import { AnimationDirector } from '../director';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);

@Component
export default class Scrubber extends Vue {
  isPlaying = false;
  grabbed = false;
  director = AnimationDirector.Instance;

  get scrubTime() {
    const milliseconds = this.director.CurrentScrubTime;
    const total_seconds = milliseconds / 1000;
    const minutes = Math.floor(total_seconds / 60);
    const seconds = Math.floor(total_seconds - minutes * 60);
    const second_str = String(seconds).padStart(2, '0');
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

  get timeIndicatorStyle() {
    // since we're coming from tyhe right
    const perc =
      100 -
      Math.round(
        (100.0 * this.director.CurrentScrubTime) / this.director.MaxScrubTime
      );
    return {
      right: String(perc) + '%'
    };
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
  split() {
    this.director.Split();
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

  movedHandler(event: MouseEvent | TouchEvent) {
    console.log('MOVED', event);
    event.stopPropagation();
  }
  movingHandler(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    if (this.grabbed){
      //console.log(event);
    }
    
  }

  startHandler(event: MouseEvent | TouchEvent) {
    console.log('Start', event);
    this.pause();
    event.stopPropagation();
  }
  endHandler(event: MouseEvent | TouchEvent) {
    console.log('Stop', event);
  }
}
</script>

<style scoped lang="scss">
.btn-scrub:hover {
  color: wheat;
}
.time-indicator {
  height: 1.5em;
  width: 1.5em;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(50%);
  border-radius: 0.75em;
  cursor: pointer;
  background: white;
  pointer-events: none;
}
.scrubber,
.time-bar {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.scrubber {
  position: relative;
  margin: 0 auto;
  margin-top: 0.75em;
  height: 1em;
  background: -webkit-linear-gradient(top, #4c4e5a 0%, #2c2d33 100%);
  background: -moz-linear-gradient(top, #4c4e5a 0%, #2c2d33 100%);
  background: -o-linear-gradient(top, #4c4e5a 0%, #2c2d33 100%);
  background: -ms-linear-gradient(top, #4c4e5a 0%, #2c2d33 100%);
  background: linear-gradient(top, #4c4e5a 0%, #2c2d33 100%);
  .time-bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #eee;
    pointer-events: none;
  }
}

.scrubber:after {
  content: '';
}
</style>
