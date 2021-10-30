<template>
  <div class="works" v-if="keyword.trim().length > 0">
    <MasnoryLayout :search="keyword" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, getCurrentInstance } from "vue";
  import MasnoryLayout from "@/components/common/MasnoryLayout.vue";
  import searchHistory from "@/components/search-category/searchHistory";
  export default defineComponent({
    name: "Total Tab",
    components: {
      MasnoryLayout,
    },
    setup() {
      const { keyword } = searchHistory();
      return { keyword };
    },
  });
</script>
<style scoped lang="scss">
  .works {
    overflow-y: auto;
    padding: 20px;
  }
</style>
