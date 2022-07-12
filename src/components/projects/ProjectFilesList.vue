<template>
  <div class="flex flex-wrap">
    <button v-for="item of files" :key="item.id"
            class="mr-2 py-2 px-4 file flex items-center justify-center border-2 border rounded-lg max-w-lg relative hover:border-gray-200"
            @click="edit(item.id)">
      <span class="text-lg text-secondary block overflow-ellipsis overflow-hidden
                   dark:text-gray-200">{{ item.name }}</span>
      <fa-icon icon="pencil-alt" size="lg"
               class="icon text-secondary md:text-lg m-auto cursor-pointer absolute
                      dark:text-gray-200"></fa-icon>
    </button>
    <button class="py-2 px-4 flex items-center justify-center border-2 border rounded-2xl max-w-2xl relative hover:border-gray-200 hover:opacity-75"
            @click="add">
      <fa-icon icon="plus" class="text-secondary md:text-lg m-auto cursor-pointer
                                  dark:text-gray-200"></fa-icon>
    </button>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { ProjectItemFileModel } from '@/models/project/project-item.model';

@Options({
  props: {
    files: {
      type: Object as PropType<ProjectItemFileModel[]>,
      required: true
    }
  },
  emits: {
    addFile: Object as PropType<void>,
    editFile: Number
  }
})
export default class ProjectFilesList extends Vue {
  files!: ProjectItemFileModel[];

  add(): void {
    this.$emit('addFile');
  }

  edit(fileId: number): void {
    this.$emit('editFile', fileId);
  }
}
</script>

<style lang="scss" scoped>
.file {
  & > .icon {
    display: none;
    width: 20px;
  }

  &:hover {
    & > span {
      opacity: 0.2;
    }

    & > .icon {
      display: block;
    }
  }
}
</style>
