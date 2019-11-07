<template>
    <div class="studio">
        <div class="row">
            <div class="col-lg-10 col-md-9 col-sm-12 mih-80 bg-gray">
                <div id="drawing-area" class="drawing-area p-1 mb-2">
                    <!-- write to have a certain aspect ratio of 16:10? -->
                    <Canvas />
                </div>
                <div class="bg-info text-center escape-gutters">Scrubber</div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-12 bg-dark mih-80">
                Sidebar here
                Settings and whatnot?
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Canvas from "./Canvas.vue";

@Component({
  components: {
    Canvas
  }
})
export default class Studio extends Vue {

}
</script>
