<template>
  <el-card>
    <ht-action-panel>
      <template slot="left">
        <el-input v-model="listQuery.name" placeholder="请输入名称" class="search-item" clearable @keyup.enter.native="onSearch" />
        <el-input v-model="listQuery.introduce" placeholder="请输入介绍" class="search-item" clearable @keyup.enter.native="onSearch" />
        <search-clear-buttons @on-search="onSearch()" @on-clear="onClear()" />
      </template>
      <template slot="right">
        <el-button type="primary" icon="el-icon-circle-plus" @click="onCreate()">新建</el-button>
      </template>
    </ht-action-panel>
    <ht-table ref="table" v-loading="isLoading" :data="list" row-key="id">
      <ht-table-column type="index" width="55" label="序号" />
      <ht-table-column label="名称" prop="name" min-width="100" />
      <ht-table-column label="介绍" prop="introduce" min-width="100" />
      <ht-table-column label="容量" prop="volume" min-width="100" />
      <ht-table-column label="分类" prop="category" min-width="100" />
      <ht-table-column label="耗时" prop="takeTime" min-width="100" />
      <ht-table-column label="类型" prop="type" min-width="120" />
      <ht-table-column label="备注" prop="comment" min-width="120" />
      <ht-table-column label="操作" width="90">
        <template slot-scope="{ row }">
          <el-button type="text" class="primary" @click="onEdit(row)">编辑</el-button>
        </template>
      </ht-table-column>
    </ht-table>
    <ht-pagination
      v-show="page.total>0"
      ref="page"
      :total="page.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.perPage"
      :page-sizes="pageSizes"
      @pagination="getList()"
    />

    <create-dialog ref="create" />
    <edit-dialog ref="edit" />
  </el-card>
</template>

<script>
import SearchClearButtons from '@/components/SearchClearButtons/index'
import listMixin from '@/views/mixins/listMixin'
import CreateDialog from './create'
import EditDialog from './edit.'

export default {
  components: { SearchClearButtons, CreateDialog, EditDialog },
  mixins: [listMixin],
  props: {
  },
  data() {
    return {
      listQuery: {
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.list = [
        { name: '测试名称', introduce: '测试介绍', volume: '13312',
          category: '测试分类', takeTime: '22小时12分30秒', type: '测试类型', comment: '测试备注' }
      ]
    },
    // 新建
    onCreate() {
      this.$refs.create.open()
    },
    // 编辑
    onEdit(row) {
      this.$refs.edit.open(row)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

