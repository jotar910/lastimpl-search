<template>
  <div class="home container m-auto">
    <img class="home__logo" alt="App small logo" :src="logo">
    <form class="search-box">
      <search-input v-model="term" class="search-box__input mx-auto max-w-md"
                    @search="search"></search-input>
      <section class="search-box__actions">
        <Button :buttonStyles="['secondary']" @click.prevent="search">{{ $t('home.search') }}</Button>
        <Button :buttonStyles="['secondary']">{{ $t('home.advancedSearch') }}</Button>
      </section>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import SearchInput from '@/components/SearchInput.vue';
import Button from '@/components/Button.vue';
import { RouteNames } from '@/router/route-names';

@Options({
  components: {
    Button,
    SearchInput
  }
})
export default class Home extends Vue {
  get darkMode (): boolean {
    return this.$store.getters.darkMode;
  }

  term: string = '';

  get logo (): string {
    return require(`@/assets/${this.darkMode ? 'logo-dark.png' : 'logo.png'}`);
  }

  search (): void {
    if (!this.term) {
      return;
    }
    this.$router.push({
      name: RouteNames.Search,
      query: { q: this.term }
    });
  }
}
</script>

<style lang="scss" scoped>
.home {
  align-content: flex-start;
  display: grid;
  grid-auto-columns: minmax(auto, 760px);
  height: 100%;
  justify-content: center;
  padding: calc(max(10vh, 20px)) 20px 20px;
  width: 100%;

  &__logo {
    height: 200px;
    margin: 40px auto;
  }
}

.search-box {
  grid-template-columns: repeat(2, 1fr);
  max-width: 760px;

  &__input {
    margin-bottom: 10px;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    button {
      flex-basis: max-content;
      flex-shrink: 0;
      margin: 10px;
      min-width: 150px;
    }
  }
}
</style>
