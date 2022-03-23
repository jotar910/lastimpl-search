<template>
  <div class="projects container m-auto p-2 md:p-5 xl:p-10">
    <section class="flex items-center justify-between mb-5 md:mb-8">
      <search-input v-model="term" class="flex-grow mr-auto max-w-xs"
                    :input-styles="['text-sm md:text-base', 'h-8 md:h-10']"
                    :button-styles="['right-3', 'w-3 md:w-4', 'top-0.5 md:top-2', 'm-auto']"
                    @search="searchList" @keyup.enter="searchList">
      </search-input>
      <fa-icon icon="plus" class="text-secondary md:text-lg m-2 md:mx-5 cursor-pointer hover:opacity-50
                                  dark:text-gray-200"></fa-icon>
    </section>
    <global-loading v-if="loadingList"></global-loading>
    <template v-else-if="projects.length">
      <project-item v-for="item of projects" :key="item.id" :project="item" class="mb-8"/>
    </template>
    <template v-else>
      <span class="block text-xl text-gray-800 dark:text-white">{{ $t('search.notFound') }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { RouteNames } from '@/router/route-names';
import Confirmation from '@/components/Confirmation.vue';
import GlobalLoading from '@/components/GlobalLoading.vue';
import ProjectItem from '@/components/projects/ProjectItem.vue';
import SearchInput from '@/components/SearchInput.vue';
import { ProjectListFiltersModel } from '@/models/project/project-list-filters.model';
import { ProjectItemModel } from '@/models/project/project-item.model';
import { ProjectListModel } from '@/models/project/project-list.model';

@Options({
  components: {
    ConfirmationContainer: Confirmation,
    GlobalLoading,
    ProjectItem,
    SearchInput
  }
})
export default class ProjectList extends Vue {
  get loadingList (): boolean {
    return this.$store.getters['projects/listLoading'];
  }

  get term (): string {
    return this.filters?.query ?? '';
  }

  set term (value: string) {
    this.$store.dispatch('projects/updateFilters', { query: value });
  }

  get projects (): ProjectItemModel[] {
    return this.projectsList?.data ?? [];
  }

  private get projectsList (): ProjectListModel | null {
    return this.$store.getters['projects/listResults'];
  }

  private get filters (): ProjectListFiltersModel | null {
    return this.$store.getters['projects/listFilters'];
  }

  beforeMount (): void {
    this.term = this.$route.query.q as string ?? '';
    this.search(this.filters);
  }

  beforeUnmount(): void {
    this.$store.commit('projects/clearList');
  }

  created (): void {
    this.$watch(() => this.$route.query, (curQuery: Record<string, string>) => {
      this.search({
        query: curQuery.q as string ?? ''
      });
    });
  }

  searchList (): void {
    this.$router.push({
      name: RouteNames.ProjectsList,
      query: {
        q: this.term || undefined
      }
    });
  }

  private search (filters: ProjectListFiltersModel | null): void {
    this.$store.dispatch('projects/searchList', filters);
  }
}
</script>

<style lang="scss" scoped>

</style>
