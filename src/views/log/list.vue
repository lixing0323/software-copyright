<template>
  <el-card>
    <ht-action-panel>
      <template slot="left">
        <el-input v-model="listQuery.username" placeholder="请输入用户名" class="search-item" clearable @keyup.enter.native="onSearch" />
        <el-input v-model="listQuery.type" placeholder="请输入日志类型" class="search-item" clearable @keyup.enter.native="onSearch" />
        <search-clear-buttons @on-search="onSearch()" @on-clear="onClear()" />
      </template>
      <template slot="right">
        <el-button type="primary" icon="el-icon-s-data" @click="onExport()">导出日志</el-button>
      </template>
    </ht-action-panel>
    <ht-table ref="table" v-loading="isLoading" :data="list" row-key="id" @selection-change="handleSelectionChange">
      <ht-table-column type="selection" width="45" align="center" />
      <ht-table-column type="index" width="55" label="序号" />
      <ht-table-column label="用户名" prop="username" min-width="100" />
      <ht-table-column label="时间" prop="time" min-width="100" />
      <ht-table-column label="日志操作记录" prop="log" min-width="100" />
      <ht-table-column label="操作次数" prop="actionCount" min-width="100px" />
      <ht-table-column label="类型" prop="type" min-width="100px" />
      <ht-table-column label="访问次数" prop="loginCount" min-width="100px" />
      <ht-table-column label="操作" width="90">
        <template slot-scope="{ row }">
          <el-button type="text" class="primary" @click="onView(row)">查看详情</el-button>
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
  </el-card>
</template>

<script>
import SearchClearButtons from '@/components/SearchClearButtons/index'
import listMixin from '@/views/mixins/listMixin'

export default {
  components: { SearchClearButtons },
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
        { id: 1, username: '张三', time: '2022/03/12 12:29:10', log: '查看', actionCount: '3次', type: '日志', loginCount: '1次' },
        { id: 2, username: '李四', time: '2022/03/13 09:13:03', log: '编辑', actionCount: '1次', type: '日志', loginCount: '1次' },
        { id: 3, username: '王五', time: '2022/03/12 11:23:36', log: '编辑', actionCount: '4次', type: '日志', loginCount: '1次' },
        { id: 4, username: '赵六', time: '2022/03/13 10:13:37', log: '删除', actionCount: '1次', type: '日志', loginCount: '1次' },
        { id: 5, username: '测试1', time: '2022/03/12 11:17:46', log: '保存', actionCount: '2次', type: '日志', loginCount: '1次' },
        { id: 6, username: '测试2', time: '2022/03/13 08:26:31', log: '保存', actionCount: '4次', type: '日志', loginCount: '1次' },
        { id: 7, username: '测试3', time: '2022/03/13 14:17:26', log: '查看', actionCount: '4次', type: '日志', loginCount: '1次' },
        { id: 8, username: '测试4', time: '2022/03/13 16:15:29', log: '查看', actionCount: '5次', type: '日志', loginCount: '1次' }
      ]
    },
    // 编辑
    onView(row) {
    },
    onExport() {
      this.$confirm('此操作将导出所选中的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({ message: '导出成功!', duration: 5000, type: 'success' })
      })
    },
    handleSelectionChange(val) {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

