<template>
  <article>
    <details class="dark:text-white">
      <summary class="cursor-pointer mb-3">
        <span class="select-none font-light text-green-700 text-xs dark:text-green-200">{{ updatedAtStringDate }}</span>
        <router-link class="block truncate font-sans font-semibold text-lg text-gray-800 mb-0.5 dark:text-white"
                     :to="['/projects', project.id]">
          {{ project.name }}
        </router-link>
        <span
          class="custom-scrollbar max-h-12 overflow-y-auto cursor-text pointer-events-auto block font-sans font-light text-gray-500 text-xs dark:text-gray-200"
          @click.prevent>{{ project.description }}</span>
      </summary>
      <div class="flex flex-wrap">
        <p-button :button-styles="['secondary-outline', 'xs']" v-for="file of project.files" :key="file.id"
                  class="truncate rounded-lg border border-gray-500 mr-3 mb-2">
          {{ file.name }}
        </p-button>
      </div>
    </details>
  </article>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { ProjectItemModel } from '@/models/project/project-item.model'
import Button from '@/components/Button.vue'

@Options({
  components: { 'p-button': Button },
  props: {
    project: {
      type: Object as PropType<ProjectItemModel>,
      required: true
    }
  }
})
export default class SearchResultItem extends Vue {
  project!: ProjectItemModel

  get updatedAtStringDate (): string {
    return new Date(this.project.updatedAt).toLocaleString()
  }
}
</script>

<style lang="scss" scoped>
summary::marker {
  cursor: pointer;
}
</style>
