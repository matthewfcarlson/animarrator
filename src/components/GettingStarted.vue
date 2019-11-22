<template>
  <div class="container">
    <h1>Getting Started</h1>
    <p>A few notes</p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Vestibulum ac venenatis lacus.
      Suspendisse massa dolor, posuere eu mollis in, interdum ut turpis.
      Morbi malesuada viverra tellus sit amet tincidunt.
      In hac habitasse platea dictumst.
      Pellentesque lacinia commodo enim, eu pellentesque massa dignissim ac.
      Sed nisl quam, commodo ut orci eu, auctor ullamcorper quam.
      Aenean arcu urna, sodales sit amet diam et, pellentesque molestie lectus.
      Ut placerat ipsum risus, non scelerisque dolor ultricies vitae.
      Etiam risus neque, tempor ac felis ut, dignissim suscipit est.
    </p>

    <p>
      Morbi malesuada libero at venenatis pretium.
      Donec ultricies feugiat mollis.
      Nam id tempor nibh.
      Fusce sit amet lobortis mi, vitae euismod sem.
      Fusce tincidunt mauris sapien, et convallis quam dapibus non.
      Nullam felis ex, vehicula eget dui non, elementum rutrum turpis.
      Ut venenatis sagittis euismod.
      Duis urna libero, suscipit non ligula ac, volutpat tempor nisl.
      Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Praesent tincidunt porta tellus, vel commodo lorem tincidunt non.
      Sed auctor, orci sit amet ullamcorper congue, dolor libero aliquet nulla, nec auctor nunc enim id velit.
      Integer et libero nec ante euismod elementum.
      Ut dapibus blandit blandit.
      Donec efficitur pellentesque ante eu elementum. Sed ac venenatis sem.
      Vivamus condimentum, tellus nec efficitur luctus, diam nunc faucibus est, in tempor leo orci quis elit.
    </p>

    <p>
      Nulla suscipit aliquet porttitor.
      Quisque elit urna, tincidunt tincidunt imperdiet quis, rutrum sed turpis.
      Nullam ut tincidunt neque. Praesent id hendrerit felis.
      Phasellus commodo elementum sem eget vehicula.
      Nunc fermentum eu risus eget luctus.
      Nam sed luctus leo. Quisque eros enim, commodo nec finibus ut, pulvinar quis ligula.
      Duis cursus est ac molestie congue.
      Ut mattis ornare libero, vel viverra urna dictum tincidunt.
      Etiam auctor turpis aliquet lectus viverra, non luctus dolor porta.
      Suspendisse vel dolor ac justo ultrices mattis quis id eros.
    </p>

    <p>
      Sed quis rhoncus lacus.
      Integer bibendum suscipit suscipit.
      Fusce tincidunt blandit est, id fermentum dui sollicitudin sit amet.
      Donec ac ultrices lorem, vitae fringilla dui.
      Nulla interdum erat sit amet tellus ultrices bibendum.
      Curabitur bibendum, felis vel facilisis rhoncus, nisi massa maximus magna, sed ullamcorper augue ligula rutrum leo.
      Quisque ultrices nec quam euismod egestas.
    </p>

    <p>
      Ut dui sem, mollis a mauris sed, scelerisque eleifend nulla.
      Praesent vel lectus in ligula finibus pharetra.
      Integer libero mi, lacinia vitae faucibus lobortis, gravida quis dolor.
      Donec placerat odio eu nunc molestie, vitae dapibus augue pharetra.
      Nam in pulvinar lectus, at venenatis odio.
      Ut in nulla egestas, consectetur nisi sed, vulputate quam.
      Nulla hendrerit quam ornare nisl porta interdum.
    </p>
    <button class="btn btn-block btn-success" @click="goToProject">Start a Project</button>
    <br />
  </div>
</template>

<script lang="ts">
//TODO make sure that this is at the bottom of the screen?
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class GettingStarted extends Vue {
  goToProject() {
    this.$emit('click');
  }
}
</script>

<style scoped lang="scss">
</style>
