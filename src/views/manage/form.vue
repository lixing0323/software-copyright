<template>
  <div>
    <ht-form ref="form" :model="form" label-width="140px" :rules="formRules">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="介绍" prop="introduce">
        <el-input v-model="form.introduce" />
      </el-form-item>
      <el-form-item label="容量" prop="volume">
        <el-input v-model="form.volume" />
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-input v-model="form.category" />
      </el-form-item>
      <el-form-item label="耗时" prop="takeTime">
        <el-input v-model="form.takeTime" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="form.type" />
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input v-model="form.comment" class="comment" maxlength="128" show-word-limit type="textarea" :rows="3" />
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
        name: '',
        introduce: '',
        volume: '',
        category: '',
        takeTime: '',
        type: '',
        comment: ''
      },
      formRules: {
        name: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        introduce: [{ required: true, message: '请填写介绍', trigger: 'blur' }],
        volume: [{ required: true, message: '请填写容量', trigger: 'blur' }],
        category: [{ required: true, message: '请填写分类', trigger: 'blur' }],
        takeTime: [{ required: true, message: '请填写耗时', trigger: 'blur' }],
        type: [{ required: true, message: '请填写类型', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.form.name = '测试名称'
      this.form.introduce = '测试介绍'
      this.form.volume = '22312'
      this.form.category = '大类'
      this.form.takeTime = '31小时21分15秒'
      this.form.type = '测试类型'
      this.form.comment = '测试备注'
    } else {
      this.form.name = '测试名称1'
      this.form.introduce = '测试介绍1'
      this.form.volume = '131212'
      this.form.category = '大类1'
      this.form.takeTime = '12小时41分23秒'
      this.form.type = '测试类型1'
      this.form.comment = '测试备注1'
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

