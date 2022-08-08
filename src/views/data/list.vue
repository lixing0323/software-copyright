<template>
  <el-card>
    <ht-action-panel>
      <template slot="left">
        <el-input v-model="listQuery.username" placeholder="请输入归类名" class="search-item" clearable @keyup.enter.native="onSearch" />
        <el-input v-model="listQuery.type" placeholder="请输入负责人" class="search-item" clearable @keyup.enter.native="onSearch" />
        <search-clear-buttons @on-search="onSearch()" @on-clear="onClear()" />
      </template>
      <template slot="right" />
    </ht-action-panel>
    <ht-table ref="table" v-loading="isLoading" :data="list" row-key="id">
      <ht-table-column type="index" width="55" label="序号" />
      <ht-table-column label="归类" prop="type" min-width="100" />
      <ht-table-column label="负责人" prop="username" min-width="100" />
      <ht-table-column label="标识码" prop="code" min-width="100" />
      <ht-table-column label="时间" prop="time" min-width="100px" />
      <ht-table-column label="等级" prop="level" min-width="100px" />
      <ht-table-column label="操作" width="90">
        <template slot-scope="{ row }">
          <el-button type="text" class="primary" @click="onDelete(row)">删除</el-button>
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
        { id: 1, type: 'A-121312类', username: '张三', code: '1212121A', time: '2022-03-12 14:39:13', level: '一级' },
        { id: 2, type: 'B-121331类', username: '李四', code: '4343121B', time: '2022-03-11 11:12:07', level: '一级' },
        { id: 3, type: 'A-121331类', username: '王五', code: '5454121F', time: '2022-03-14 12:44:23', level: '一级' },
        { id: 4, type: 'A-231131类', username: '赵六', code: '4545121C', time: '2022-03-15 13:51:35', level: '一级' },
        { id: 5, type: 'B-877121类', username: '测试人1', code: '121214D', time: '2022-03-13 15:32:43', level: '一级' },
        { id: 6, type: 'B-421212类', username: '测试人2 ', code: '3141212F', time: '2022-03-15 17:14:41', level: '一级' }
      ]
    },
    onDelete() {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
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

