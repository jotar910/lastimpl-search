<template>
  <div class="home container-fluid">
    <img class="home__logo" alt="Vue logo" :src="logo">
    <section class="search-box">
      <search-input v-model="term" class="search-box__input"></search-input>
      <div class="search-box__actions">
        <Button :buttonStyles="['secondary']">Pesquisar</Button>
        <Button :buttonStyles="['secondary']">Pesquisa Avançada</Button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import SearchInput from '@/components/SearchInput.vue'
import Button from '@/components/Button.vue'
import { InjectReactive } from 'vue-property-decorator'

@Options({
  components: {
    Button,
    SearchInput
  }
})
export default class Home extends Vue {
  @InjectReactive()
  darkMode!: boolean

  term = ''

  get logo (): string {
    return require(`@/assets/${this.darkMode ? 'logo-dark.png' : 'logo.png'}`)
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
