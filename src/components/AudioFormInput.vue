<template>
  <label class="file-select">
    <div class="select-button">
      <span v-if="value">Selected File: {{value.name}}</span>
      <span v-else>Select File</span>
    </div>
    <input type="file" @change="handleFileChange" />
  </label>
</template>

<script lang="ts">
//TODO make sure that this is at the bottom of the screen?
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class AudioFormInput extends Vue {
  @Prop() value!: File;
  handleFileChange(e: any) {
    if (e.target != null) {
        this.$emit('input', e.target.files[0]);
    }
  }
}
</script>

<style scoped>
.file-select > .select-button {
  padding: 1rem;

  color: white;
  background-color: #2ea169;

  border-radius: 0.3rem;

  text-align: center;
  font-weight: bold;
}

.file-select > input[type='file'] {
  display: none;
}
</style>