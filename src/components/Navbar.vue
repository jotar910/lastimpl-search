<template>
  <nav id="nav" class="container m-auto" v-if="!hideNav">
    <router-link to="/">{{ $t('navbar.home') }}</router-link>
    <router-link to="/projects">{{$t('navbar.projects')}}</router-link>
    <button @click="darkMode = !darkMode" class="nav__dark">{{ darkMode ? 'Light' : 'Dark' }}</button>
  </nav>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { RouteNames } from '@/router/route-names';

export default class Navbar extends Vue {
  get hideNav (): boolean {
    return this.$route.name === RouteNames.Search;
  }

  get darkMode (): boolean {
    return this.$store.getters.darkMode;
  }

  set darkMode (value: boolean) {
    this.$store.dispatch('changeDarkMode', value);
  }
}
</script>
