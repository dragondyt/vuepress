<script lang="ts" setup>
import Paginator from './index.js'
const props = defineProps<{
  data: any
}>()
</script>

<template>
  <nav v-if="props.data.prev || props.data.next" class="pagination">
    <div class="inner">
      <Paginator :options="props.data"></Paginator>
    </div>
  </nav>
</template>
