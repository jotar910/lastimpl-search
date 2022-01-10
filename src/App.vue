<template>
  <nav id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <button @click="dark = !darkMode" class="nav__dark">{{ dark ? 'Light' : 'Dark' }}</button>
  </nav>
  <main id="content">
    <router-view/>
  </main>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { ProvideReactive } from 'vue-property-decorator'

export default class App extends Vue {
  @ProvideReactive()
  darkMode = true

  get dark (): boolean {
    return this.darkMode
  }

  set dark (value: boolean) {
    const html = document.querySelector('html')
    if (html) {
      value ? html.classList.add('dark') : html.classList.remove('dark')
    }
    this.darkMode = value
  }

  created (): void {
    this.dark = false
  }
}
</script>

<style lang="scss">
#app {
  @apply bg-background-light dark:bg-background-dark;
  display: grid;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#nav {
  display: flex;
  padding: 20px 30px;

  a {
    @apply text-secondary dark:text-white;
    color: #2c3e50;
    margin-right: 20px;

    &.router-link-exact-active {
      @apply inline-block text-primary dark:text-white transform-gpu scale-110 -translate-x-0.5 -translate-y-0.5 transition-transform ease-out duration-75;
    }
  }

  .nav__dark {
    @apply text-secondary dark:text-white;
    margin-left: auto;
  }
}
</style>
