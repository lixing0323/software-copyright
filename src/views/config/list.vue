<template>
  <el-card>
    <ht-action-panel>
      <template slot="left">
        <el-input v-model="listQuery.name" placeholder="请输入识别码" class="search-item" clearable @keyup.enter.native="onSearch" />
        <search-clear-buttons @on-search="onSearch()" @on-clear="onClear()" />
      </template>
      <template slot="right">
        <el-button type="primary" icon="el-icon-circle-plus" @click="onCreate()">新建</el-button>
        <el-button type="warning" icon="el-icon-printer" @click="onExport()">导出</el-button>
      </template>
    </ht-action-panel>
    <ht-table ref="table" v-loading="isLoading" :data="list" row-key="id">
      <ht-table-column type="index" width="55" label="序号" />
      <ht-table-column :label="`${SHORT_NAME}统计归类`" prop="category" min-width="100" />
      <ht-table-column label="时间" prop="time" min-width="100" />
      <ht-table-column label="识别码" prop="code" min-width="100" />
      <ht-table-column label="等级" prop="level" min-width="100" />
      <ht-table-column :label="`${SHORT_NAME}统计模式`" prop="mode" min-width="100" />
      <ht-table-column :label="`${SHORT_NAME}统计参数`" prop="params" min-width="120" />
      <ht-table-column label="开始时间" prop="start" min-width="120" />
      <ht-table-column label="结束时间" prop="end" min-width="120" />
      <ht-table-column label="方式" prop="method" min-width="120" />
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
import { SHORT_NAME } from '@/lang/zh.js'

export default {
  components: { SearchClearButtons, CreateDialog, EditDialog },
  mixins: [listMixin],
  props: {
  },
  data() {
    return {
      SHORT_NAME,
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
        { category: 'A型', time: '2022-02-15', code: '202201212ab', level: '1级',
          mode: '测试模式', params: 'a', start: '2022-04-12 12:10:20', end: '2022-04-16 14:02:19', method: '测试方式' },
        { category: 'B型', time: '2022-02-16', code: '202212131ab', level: '2级',
          mode: '测试模式', params: 'b', start: '2022-04-13 07:19:18', end: '2022-04-17 19:10:11', method: '测试方式' },
        { category: 'C型', time: '2022-02-17', code: '20221212dab', level: '1级',
          mode: '测试模式', params: 'c', start: '2022-04-14 09:11:39', end: '2022-04-18 12:33:17', method: '测试方式' },
        { category: 'D型', time: '2022-02-18', code: '20220212fab', level: '3级',
          mode: '测试模式', params: 'a', start: '2022-04-15 14:22:09', end: '2022-04-19 14:48:49', method: '测试方式' },
        { category: 'E型', time: '2022-02-19', code: '202203112ab', level: '2级',
          mode: '测试模式', params: 'b', start: '2022-04-16 21:22:13', end: '2022-04-20 16:28:23', method: '测试方式' },
        { category: 'A型', time: '2022-02-20', code: '202203312ab', level: '1级',
          mode: '测试模式', params: 'd', start: '2022-04-17 16:21:07', end: '2022-04-21 17:26:22', method: '测试方式' },
        { category: 'E型', time: '2022-02-21', code: '202202112ab', level: '3级',
          mode: '测试模式', params: 'a', start: '2022-04-18 17:07:01', end: '2022-04-22 09:31:31', method: '测试方式' }
      ]
    },
    // 新建
    onCreate() {
      this.$refs.create.open()
    },
    // 编辑
    onEdit(row) {
      this.$refs.edit.open(row)
    },
    // 导出
    onExport() {
      this.$message({ message: '导出成功!', duration: 5000, type: 'success' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

