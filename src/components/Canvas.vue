
<template>
  <canvas
    v-touch:moved="movedHandler"
    v-touch:moving="movingHandler"
    v-touch:start="startHandler"
    v-touch:end="endHandler"
    id="drawing-canvas"
    :style="{height: height}"
    class="w-100 border"
  ></canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);

@Component
export default class Canvas extends Vue {
  height = '50px';
  ratio = 9.0 / 16.0; //this is the optimal youtube ratio
  drawing = false;
  current_line: Number[] = [];
  mounted() {
    this.windowResized();
    window.addEventListener('resize', this.windowResized);
  }
  windowResized() {
    console.log('The window has resized');
    const width =
      1.0 * document.querySelector('#drawing-canvas')!.clientWidth ||
      window.innerWidth * 0.6;
    console.log(width);
    this.height = Math.round(this.ratio * width) + 'px'; //take the smaller of the two numbers
    console.log(this.height);
  }
  movedHandler(event: MouseEvent | TouchEvent) {
    console.log('MOVED');
    event.stopPropagation();
  }
  movingHandler(event: MouseEvent | TouchEvent) {
    event.stopPropagation();
    if (this.drawing) {
      if (event instanceof MouseEvent) {
        //console.log('MOUSE MOVE');
        this.current_line.push(event.clientX);
      } else {
        //console.log('TOUCH MOVE');
        this.current_line.push(event.touches[0].clientX);
      }
    }
  }

  startHandler(event: MouseEvent | TouchEvent) {
    console.log('Start');
    this.drawing = true;
    event.stopPropagation();
  }
  endHandler(event: MouseEvent | TouchEvent) {
    console.log('Stop');
    event.stopPropagation();
    this.drawing = false;
    console.log(this.current_line);
    this.current_line = [];
  }
}
</script>

<style scoped lang="scss" scoped>
#drawing-canvas {
  touch-action: none;
  background-color:white;
}
</style>