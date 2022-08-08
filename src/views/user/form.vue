<template>
  <div>
    <ht-form ref="form" :model="form" label-width="140px" :rules="formRules">
      <el-form-item label="用户组" prop="group">
        <el-input v-model="form.group" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="用户编码" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-date-picker
          v-model="form.time"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placement="bottom-start"
          placeholder="请选择时间"
        />
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-input v-model="form.level" />
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
  </div>
</template>

<script>
export default {
  components: { },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        group: '',
        username: '',
        code: '',
        time: '',
        level: ''
      },
      formRules: {
        group: [{ required: true, message: '请填写用户组', trigger: 'blur' }],
        username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        code: [{ required: true, message: '请填写用户编码', trigger: 'blur' }],
        time: [{ required: true, message: '请填写时间', trigger: 'blur' }],
        level: [{ required: true, message: '请填写等级', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.form.group = '专属用户组'
      this.form.username = '测试人4'
      this.form.code = '200220416iiuu'
      this.form.time = '2022-04-16 17:42:25'
      this.form.level = '一级'
    } else {
      this.form.group = '专属用户组'
      this.form.username = '测试人5'
      this.form.code = '200220417iiuu'
      this.form.time = '2022-04-17 15:13:33'
      this.form.level = '一级'
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

