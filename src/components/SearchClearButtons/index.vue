<template>
  <span style="margin-left: 10px">
    <el-button type="primary" icon="el-icon-search" @click="handleSearch">
      {{ $t("buttons.search") }}
    </el-button>
    <el-button type="default" icon="el-icon-delete" @click="handleClear()">
      {{ $t("buttons.clear") }}
    </el-button>
  </span>
</template>

<script>
// 搜索，清除组件
export default {
  name: 'SearchClearButtons',
  data() {
    return {}
  },
  methods: {
    handleSearch() {
      this.$emit('on-search')
    },
    handleClear() {
      this.$emit('on-clear')
    }
  }
}
</script>
