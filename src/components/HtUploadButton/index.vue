<template>
  <div style="display: inline-block">
    <input ref="fileInputBtn" type="file" style="display: none" name="file-input" :multiple="multipleSelection" :accept="fileAccept" :value="filesValue" @change="onFilesSelected">
    <el-button :type="buttonType" size="mini" :disabled="disabled" :icon="buttonIcon" :loading="isLoading" @click="onFileInputClick">{{ buttonTitle }}</el-button>
  </div>
</template>

<script>
import { FILE_ACCEPT, filenameWithTimestamp } from '@/utils'
import { getCosFileUrl, getImageUrl, sliceUploadFile, sliceUploadFiles } from '@/utils/cos'

const MAX_FILE_SIZE = 1024 * 1024 * 5

export default {
  name: 'HtUploadButton',
  components: { },
  props: {
    fileType: {
      type: String,
      default: 'image',
      validator(val) {
        return ['image', 'doc', 'zip', 'all', 'security'].indexOf(val) !== -1
      }
    },
    keyPrefix: {
      type: String,
      required: true,
      default: null
    },
    initContext: {
      type: [Object, String],
      default: null
    },
    buttonType: {
      type: String,
      default: 'success'
    },
    buttonTitle: {
      type: String,
      default: '上传'
    },
    buttonIcon: {
      type: String,
      default: 'el-icon-upload'
    },
    multipleSelection: {
      type: Boolean,
      default: false
    },
    showSuccessTip: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    uploadTemp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      context: this.initContext,
      isLoading: false,
      filesValue: '',
      files: [],
      percentage: 0
    }
  },
  computed: {
    fileAccept() {
      return FILE_ACCEPT[this.fileType]
    },
    formattedPercentage() {
      return this.percentage >= 100 ? '上传完成' : `${this.percentage}%`
    }
  },
  methods: {
    setContext(context) {
      this.context = context
    },
    onFileInputClick() {
      this.filesValue = ''
      this.$nextTick(() => {
        this.$refs.fileInputBtn.click()
      })
    },
    beginUpload() {
      this.isLoading = true
      this.$emit('on-upload-start')
      this.$emit('on-upload-progress', 1, 0)
    },
    afterUploaded() {
      this.isLoading = false
      this.$emit('on-upload-progress', 0, 0)
      this.$emit('on-upload-finish')
    },
    onFilesSelected(ev) {
      ev.preventDefault()
      if (this.multipleSelection) {
        this.onUploadFiles(ev.target.files)
      } else {
        const file = ev.target.files[0]
        if (file.size >= MAX_FILE_SIZE) {
          this.$message({ message: '文件大小不能超过5MB', duration: 1500, type: 'warning' })
          return
        }
        this.onUploadSingleFile(file)
      }
    },
    makeFileKey(fileName) {
      return `${this.keyPrefix}/${filenameWithTimestamp(fileName, this.uploadTemp)}`
    },
    onUploadProgress(percent, speed) {
      this.$emit('on-upload-progress', percent, speed)
    },
    onUploadSingleFile(file) {
      this.beginUpload()
      const fileUpload = { key: this.makeFileKey(file.name), body: file }
      sliceUploadFile(fileUpload, null, this.onUploadProgress,
        (err, data) => {
          if (!err) {
            if (this.showSuccessTip) {
              this.$message({ message: `上传成功`, duration: 1500, type: 'success' })
            }
            const fileUrl = this.fileType === 'image' ? getImageUrl(data) : getCosFileUrl(data)
            this.$emit('on-file-uploaded', this.context, fileUrl)
          } else {
            this.$message({ message: `上传失败: ${err.error}`, duration: 1500, type: 'error' })
          }
          this.afterUploaded()
        })
    },
    onUploadFiles(filesToUpload) {
      this.beginUpload()
      const files = []
      for (const file of filesToUpload) {
        files.push({ key: this.makeFileKey(file.name), body: file })
      }
      sliceUploadFiles(files, null, this.onUploadProgress,
        (err, data) => {
          if (!err) {
            const urls = []
            data.files.forEach(item => {
              urls.push(this.fileType === 'image' ? getImageUrl(item) : getCosFileUrl(item))
            })
            this.$emit('on-files-uploaded', this.context, urls)
          } else {
            this.$message({ message: `上传失败: ${err.error}`, duration: 1500, type: 'error' })
          }
          this.afterUploaded()
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
