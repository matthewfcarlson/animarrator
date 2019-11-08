<template>
    <div class="studio">
        <div class="row">
            <div class="col-lg-10 col-md-9 col-sm-12 mih-80 bg-gray">
                <div id="drawing-area" class="drawing-area p-1 mb-2">
                    <!-- write to have a certain aspect ratio of 16:10? -->
                    <Canvas />
                </div>
                <Scrubber />
            </div>
            <SideBar />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Canvas from "./Canvas.vue";
import Scrubber from "./Scrubber.vue";
import SideBar from "./SideBar.vue";

@Component({
  components: {
    Canvas,
    Scrubber,
    SideBar
  }
})
export default class Studio extends Vue {

}
</script>
