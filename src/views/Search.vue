<template>
  <global-loading v-if="querying"></global-loading>
  <form class="search flex items-center px-8 py-4 px-10 py-5">
    <img class="search__logo cursor-pointer mr-10" alt="App logo" :src="logo"
         @click.prevent="gotoHome">
    <search-input v-model="term" class="search__input w-full max-w-xl"
                  :input-styles="['text-sm', 'h-10']"
                  :button-styles="['right-5', 'top-2']"
                  @search="submit">
    </search-input>
  </form>
  <section v-if="!querying && list" class="px-8 py-4 md:px-10 md:py-5">
    <template v-if="list.data.length">
      <search-result-item v-for="result of list.data"
                          :project="result" :key="result.id"
                          class="mb-4 md:mb-8">
      </search-result-item>
    </template>
    <span v-else class="block text-xl text-gray-800 dark:text-white">
      {{ $t('search.notFound') }}
    </span>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import SearchInput from '@/components/SearchInput.vue'
import Button from '@/components/Button.vue'
import { RouteNames } from '@/router/route-names'
import GlobalLoading from '@/components/GlobalLoading.vue'
import SearchResultItem from '@/components/search/SearchResultItem.vue'
import { ProjectListModel } from '@/models/project/project-list.model'

@Options({
  components: {
    Button,
    GlobalLoading,
    SearchInput,
    SearchResultItem
  },
  beforeRouteUpdate (to: RouteLocationNormalizedLoaded) {
    this.search(to.query.q)
  }
})
export default class Search extends Vue {
  get term (): string {
    return this.$store.getters['search/query']
  }

  set term (value: string) {
    this.$store.commit('search/query', value)
  }

  get darkMode (): boolean {
    return this.$store.getters.darkMode
  }

  get logo (): string {
    return require(`@/assets/${this.darkMode ? 'logo-dark-icon.png' : 'logo-icon.png'}`)
  }

  get termQuery (): string {
    return this.$route.query.q as string
  }

  get querying (): boolean {
    return this.$store.getters['search/querying']
  }

  get list (): ProjectListModel | null {
    return this.$store.getters['search/results']
  }

  mounted (): void {
    this.search(this.$route.query.q as string)
  }

  gotoHome (): void {
    this.$router.push({ name: RouteNames.Home })
  }

  submit (): void {
    if (!this.term) {
      return
    }
    if (this.term !== this.$route.query.q) {
      this.$router.push({ query: { q: this.term } })
      return
    }
    this.$store.dispatch('search/query', this.term)
  }

  async search (query: string | undefined): Promise<void> {
    if (!query) {
      this.$router.push({
        name: RouteNames.Home,
        replace: true
      })
      return
    }
    this.term = query
    this.$store.dispatch('search/query', query)
  }
}
</script>

<style lang="scss" scoped>
.search {
  &__logo {
    height: 60px;
    width: 60px;
  }
}
</style>
