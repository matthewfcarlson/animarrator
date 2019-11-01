<template>
  <div class="bg-primary escape-gutters">
    <nav class="navbar navbar-expand-lg navbar-dark container" role="navigation">
      <a class="navbar-brand font-weight-bold ml-lg-4" href="/">animator studio</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mr-lg-4">
          <li class="nav-item">
            <a class="nav-link" href="docs/">Docs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="">Tutorial</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/matthewfcarlson/animatorstudio">Github</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
}
</script>

<style scoped lang="scss">
$animate: all 0.2s ease-in-out;

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;  
  .nav-link {
    position: relative;
    transition: $animate;
    &:before,
    &:after {
      content: "";
      position: absolute;
      bottom: -2px;
      width: 0px;
      height: 5px;
      margin: 5px 0 0;
      transition: $animate;
      transition-duration: 0.20s;
      opacity: 0;
    }
    &:after, &:before {
      left: 0;
      background-color: purple;
    }
  }
  &.active {
    .nav-link{
      &:after {
        height: 1px;
      }
    }
  }  
  &:hover {
    cursor: pointer;
    .nav-link {
      &:before {
        width: 100%;
        opacity: 1.0;
      }
    }
  }
  &.active {
    cursor: pointer;
    .nav-link {
      &:after {
        width: 100%;
        opacity: 1.0;
      }
    }
  }
}
</style>

