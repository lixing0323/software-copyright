<template>
  <div>
    <ht-action-panel>
      <template v-if="enableEditMode" slot="left">
        <ht-upload-button
          file-type="security"
          button-type="primary"
          :multiple-selection="multipleFiles"
          :key-prefix="uploadKeyPrefix"
          :button-title="uploadBtnTitle"
          @on-upload-start="onUploadStart"
          @on-file-uploaded="onFileUploaded"
          @on-files-uploaded="onFilesUploaded"
          @on-upload-progress="onUploadProgress"
        />
        <span v-if="percent!==0">{{ percent }}%</span>
        <ht-download-link v-if="templateFile" :link-url="templateFile.url" :link-title="templateFile.name" />
      </template>
      <template slot="right">
        <slot name="upload" />
        <el-button v-show="list.length>0 && batchDeleteFiles.isEnabled " :disabled="isLoading||updating || multipleSelection.length === 0" size="mini" icon="el-icon-delete" :type="isBatchDownloadText" @click="onBatchDeleteFiles(multipleSelection)">
          {{ batchDeleteFiles && batchDeleteFiles.btnName }}
        </el-button>
        <el-button v-show="list.length>0" :disabled="isLoading||updating || multipleSelection.length === 0" size="mini" icon="el-icon-link" :type="isBatchDownloadText" @click="onBatchDownloadFiles">
          {{ batchDownloadFiles && batchDownloadFiles.btnName }}
        </el-button>
        <template v-if="enableEditMode">
          <ht-help-tag v-show="list.length>0" tooltip="浅绿色背景是本次上传的附件" />
          <el-button v-show="list.length>0" :disabled="isLoading||updating" type="success" size="mini" icon="el-icon-refresh" @click="onUpdateAttachments">{{ updateBtnTitle }}</el-button>
          <el-button v-if="showCancelBtn" type="default" size="mini" @click="onCancel">取消</el-button>
        </template>
      </template>
    </ht-action-panel>
    <ht-table
      ref="table"
      v-loading="isLoading"
      element-loading-text="正在下载请稍后..."
      :data="list"
      :row-class-name="tableRowClassName"
      @select-all="onMultipleSelectionChange"
      @selection-change="onMultipleSelectionChange"
    >
      <ht-table-column v-show="list.length>0" type="selection" width="45" align="center" />
      <ht-table-column v-if="multipleFiles" label="序号" type="index" align="center" width="55" />
      <ht-table-column label="文件名称" prop="filename" width="160">
        <template slot-scope="{row}">
          {{ getFileName(row) }}
        </template>
      </ht-table-column>
      <ht-table-column label="附件链接" width="75">
        <template slot-scope="{row}">
          <el-button type="text" :loading="row.isLoading" icon="el-icon-link" @click="download(row)">下载</el-button>
        </template>
      </ht-table-column>
      <ht-table-column label="单位" min-width="170" prop="orgName" />
      <ht-table-column label="上传用户" prop="uploaderName" width="80" />
      <ht-table-column label="上传用户姓名" prop="uploaderUserName" width="95" />
      <ht-table-column label="上传日期" width="120" align="center">
        <template slot-scope="{row}">
          {{ getUploadTime(row) }}
        </template>
      </ht-table-column>
      <ht-table-column label="状态" width="80" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="!row.deleted" type="success">正常</el-tag>
          <el-tag v-else type="danger">待删除</el-tag>
        </template>
      </ht-table-column>
      <ht-table-column-operation v-if="enableEditMode" width="60">
        <template slot-scope="scope">
          <template v-if="!scope.row.deleted">
            <el-button v-show="userId === scope.row.uploaderId" type="default" size="mini" @click="toggleItemStatus(scope.$index)">移除</el-button>
          </template>
          <template v-else>
            <el-button v-show="userId === scope.row.uploaderId" type="default" size="mini" @click="toggleItemStatus(scope.$index)">恢复</el-button>
          </template>
        </template>
      </ht-table-column-operation>
      <ht-table-column v-if="list.length>0 && batchDeleteFiles.isEnabled" fixed="right" label="操作" width="95" align="center">
        <template slot-scope="{row}">
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="onBatchDeleteFiles([row])">删除</el-button>
        </template>
      </ht-table-column>
    </ht-table>
    <ht-dialog
      :visible="dialogs.downloadStatusPanelVisible"
      :width="dialogWidth.mini"
      :title.sync="dialogs.downloadStatusTitle"
      @close="dialogs.downloadStatusPanelVisible=false"
    >
      <el-progress :show-text="false" :stroke-width="24" :percentage="batch.downloadPercentage" />
    </ht-dialog>
    <iframe ref="downloadFrame" width="0" height="0" frameborder="0" name="downloadFrame" style="display:   none" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import downloader from '@/utils/downloader'
import listMixin from '@/views/mixins/listMixin'
import { originFilenameOfUrl } from '@/filters'
import uiVarMixin from '@/views/mixins/uiVarMixin'
import { downloadFile } from '@/utils/index'
import HtUploadButton from '@/components/HtUploadButton/index'

export default {
  name: 'HtUploadPane',
  components: { HtUploadButton },
  mixins: [listMixin, uiVarMixin],
  props: {
    showCancelBtn: {
      type: Boolean,
      default: false
    },
    templateFile: {
      type: Object,
      default: undefined
    },
    isBatchDownloadText: {
      type: String,
      default: 'text'
    },
    batchDownloadFiles: {
      type: Object,
      default: () => { return { btnName: '批量下载' } }
    },
    batchDeleteFiles: {
      type: Object,
      default: () => { return { btnName: '批量删除', isEnabled: false } }
    },
    multipleFiles: {
      type: Boolean,
      default: true
    },
    updateBtnTitle: {
      type: String,
      default: '更新附件'
    },
    uploadBtnTitle: {
      type: String,
      default: '上传附件'
    }
  },
  data() {
    return {
      context: null,
      isLoginUser: false,
      uploadKeyPrefix: 'temp/prefix',
      attachment: {
        filename: null,
        url: null,
        uploadTime: null,
        uploaderId: null,
        uploaderName: null,
        uploaderUserName: null,
        orgCode: null,
        orgName: null,
        deleted: false
      },
      dialogs: {
        downloadStatusTitle: '正在打包成 zip 请稍后...',
        downloadStatusPanelVisible: false
      },
      batch: {
        downloadPercentage: 30,
        downloadStatus: ''
      },
      percent: 0,
      updating: false,
      multipleSelection: [],
      userId: null
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.userId = this.userInfo.userId
  },
  methods: {
    getFileName(row) {
      if (!row.filename || row.filename === '') {
        var paramList = row.url.split('/')
        var name = paramList[paramList.length - 1]
        return decodeURI(name)
      }
      return row.filename
    },
    download(row) {
      this.isLoading = true
      downloader(row.url, this.getFileName(row), this.callback)
    },
    callback(row) {
      this.isLoading = false
    },
    onMultipleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    initUploadPane(context, attachments, uploadKeyPrefix = 'temp/prefix') {
      this.list = []
      this.updating = false
      this.context = context
      this.uploadKeyPrefix = uploadKeyPrefix
      attachments.sort((a, b) => {
        if (a.uploadTime > b.uploadTime) {
          return 1
        } else if (a.uploadTime < b.uploadTime) {
          return -1
        } else {
          return 0
        }
      })
      attachments.reverse()
      attachments.forEach(item => {
        const newItem = JSON.parse(JSON.stringify(item))
        newItem.deleted = false
        newItem.new = false
        this.list.push(newItem)
      })
    },
    makeAttachment(url) {
      return {
        filename: originFilenameOfUrl(url),
        url: url,
        uploadTime: this.$moment().format('YYYY-MM-DD HH:mm:SS'),
        uploaderId: this.userInfo.userId,
        uploaderName: this.userInfo.name || this.userInfo.account || '',
        uploaderUserName: this.userInfo.fullName,
        orgCode: this.userInfo.orgCode,
        orgName: this.userInfo.orgName,
        deleted: false,
        new: true
      }
    },
    onUploadStart() {
      this.isLoading = true
    },
    onUploadProgress(percent) {
      this.percent = percent
    },
    onFileUploaded(context, url) {
      this.list = [this.makeAttachment(url)]
      this.isLoading = false
    },
    onFilesUploaded(context, urls) {
      urls.forEach(url => {
        this.list.splice(0, 0, this.makeAttachment(url))
      })
      this.isLoading = false
    },
    toggleItemStatus(index) {
      const item = this.list[index]
      item.deleted = !item.deleted
      this.$set(this.list, index, item)
    },
    onBatchDownloadFiles() {
      // this.list
      const downloadUrls = []
      this.multipleSelection.forEach(row => {
        downloadUrls.push(row.url)
      })
      this.dialogs.downloadStatusPanelVisible = true
      this.batch.downloadPercentage = 30
      this.batch.downloadStatus = ''
    },
    onBatchDeleteFiles(selectedItems) {
      this.$emit('on-delete-attachments', selectedItems)
    },
    onUpdateAttachments() {
      this.updating = !(this.list.length > 0)
      const newList = JSON.parse(JSON.stringify(this.list.filter(item => item.deleted === false)))
      newList.forEach(item => {
        delete item.deleted
        delete item.new
      })
      this.$emit('on-update-attachments', this.context, newList)
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.new) {
        return 'new-added-row'
      } else {
        return ''
      }
    },
    onCancel() {
      this.$emit('on-cancel')
    },
    // 获取上传时间，做个兼容 ，处理
    getUploadTime(row) {
      if (row && row.uploadTime && row.uploadTime.length > 0) {
        const time = row.uploadTime.replace(/,/, '')
        return time.slice(0, 16)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .el-table .new-added-row {
    background: #f0f9eb;
  }
</style>
