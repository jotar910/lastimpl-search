<template>
  <template v-if="routeReady">
    <navbar></navbar>
    <main id="content">
      <router-view/>
    </main>
  </template>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Navbar from '@/components/Navbar.vue'

@Options({
  components: { Navbar }
})
export default class App extends Vue {
  routeReady = false

  async mounted (): Promise<void> {
    this.routeReady = await this.$router.isReady().catch().then(() => true)
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

#content {
  overflow: hidden;
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
