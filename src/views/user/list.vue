<template>
  <el-card>
    <ht-action-panel>
      <template slot="left">
        <el-input v-model="listQuery.group" placeholder="请输入用户组" class="search-item" clearable @keyup.enter.native="onSearch" />
        <el-input v-model="listQuery.username" placeholder="请输入用户名" class="search-item" clearable @keyup.enter.native="onSearch" />
        <el-input v-model="listQuery.code" placeholder="请输入用户编码" class="search-item" clearable @keyup.enter.native="onSearch" />
        <search-clear-buttons @on-search="onSearch()" @on-clear="onClear()" />
      </template>
      <template slot="right">
        <el-button type="primary" icon="el-icon-circle-plus" @click="onCreate()">新建用户</el-button>
      </template>
    </ht-action-panel>
    <ht-table ref="table" v-loading="isLoading" :data="list" row-key="id">
      <ht-table-column type="index" width="55" label="序号" />
      <ht-table-column label="用户组" prop="group" min-width="100" />
      <ht-table-column label="用户名" prop="username" min-width="100" />
      <ht-table-column label="用户编码" prop="code" min-width="100" />
      <ht-table-column label="时间" prop="time" min-width="100" />
      <ht-table-column label="等级" prop="level" min-width="100" />
      <ht-table-column label="操作" width="90">
        <template slot-scope="{ row }">
          <el-button type="text" class="primary" @click="onEdit(row)">编辑</el-button>
          <el-button type="text" class="danger" @click="onDelete(row)">删除</el-button>
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
        { group: '专属用户组', username: '张三', code: '200220413abcd', time: '2022-04-13 13:23:19', level: '一级' },
        { group: '专属用户组', username: '李四', code: '200220414fdaf', time: '2022-04-14 12:12:09', level: '一级' },
        { group: '专属用户组', username: '王五', code: '200220415wqwq', time: '2022-04-15 11:13:05', level: '一级' },
        { group: '专属用户组', username: '赵六', code: '200220415fdaaf', time: '2022-04-15 09:14:13', level: '一级' },
        { group: '专属用户组', username: '测试人1', code: '2002206afdf', time: '2022-04-16 14:24:25', level: '一级' },
        { group: '专属用户组', username: '测试人2', code: '20022046trtw', time: '2022-04-16 16:26:37', level: '一级' },
        { group: '专属用户组', username: '测试人3', code: '200220416hhgh', time: '2022-04-16 15:31:43', level: '一级' },
        { group: '专属用户组', username: '测试人4', code: '200220416iiuu', time: '2022-04-16 17:42:25', level: '一级' }
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
    // 删除
    onDelete(row) {
      this.$confirm('此操作将删除所选数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({ message: '删除成功!', duration: 5000, type: 'success' })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

