<template>
  <div class="grid grid-flow-col auto-cols-max gap-2.5">
    <button v-for="item of files" :key="item.id"
            class="file flex items-center justify-center border-2 border rounded-2xl w-24 h-36 relative hover:border-gray-200"
            @click="edit(item.id)">
      <span class="text-lg text-secondary
                   dark:text-gray-200">{{ item.name }}</span>
      <fa-icon icon="pencil-alt" size="lg"
               class="icon text-secondary md:text-lg m-auto cursor-pointer absolute
                      dark:text-gray-200"></fa-icon>
    </button>
    <button class="flex items-center justify-center border-2 border-dashed rounded-2xl w-24 h-36 hover:opacity-50"
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
  word-break: break-word;

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
