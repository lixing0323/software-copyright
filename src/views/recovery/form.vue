<template>
  <div>
    <ht-form ref="form" :model="form" label-width="140px" :rules="formRules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="恢复方式" prop="method">
        <el-input v-model="form.method" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="form.type" />
      </el-form-item>
      <el-form-item label="附件" prop="attachment">
        <el-button type="primary" @click="onUpload()">上传附件</el-button>
      </el-form-item>
    </ht-form>

    <div class="center-button">
      <el-button
        type="success"
        icon="el-icon-check"
        @click="onSubmit('form')"
      >{{ isEdit?'更新':'新建' }}</el-button>
      <el-button icon="el-icon-close" @click="onCancel()">取消</el-button>
    </div>

    <ht-dialog :visible="uploadVisible" width="1000px" append-to-body title.sync="附件" @close="uploadVisible = false">
      <ht-upload-pane ref="uploadPane" :enable-edit-mode="true" />
    </ht-dialog>
  </div>
</template>

<script>
import HtUploadPane from '@/components/HtUploadPane'

export default {
  components: { HtUploadPane },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadVisible: false,
      form: {
        name: '',
        method: '',
        type: '',
        attachment: ''
      },
      formRules: {
        name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        method: [{ required: true, message: '请填写恢复方式', trigger: 'blur' }],
        attachment: [{ required: true, message: '请填写分类', trigger: 'blur' }],
        type: [{ required: true, message: '请填写类型', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.form.name = '测试名称'
      this.form.method = '测试方式'
      this.form.attachment = 3
      this.form.type = '测试类型'
    } else {
      this.form.name = '测试名称1'
      this.form.method = '测试方式1'
      this.form.attachment = 1
      this.form.type = '测试类型1'
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('submit')
        }
      })
    },
    // 取消
    onCancel() {
      this.$emit('close')
    },
    // 上传
    onUpload() {
      this.uploadVisible = true
      this.$nextTick(() => {
        this.$refs.uploadPane.initUploadPane(null, [], 'template')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.center-button {
  margin-top: 40px;
  text-align: center;
}
</style>

