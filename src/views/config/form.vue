<template>
  <div>
    <ht-form ref="form" :model="form" label-width="240px" :rules="formRules">
      <el-form-item :label="`${SHORT_NAME}统计归类`" prop="category">
        <el-input v-model="form.category" />
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-date-picker
          v-model="form.time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="识别码" prop="code">
        <el-input v-model="form.code" />
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-input v-model="form.level" />
      </el-form-item>
      <el-form-item :label="`${SHORT_NAME}统计模式`" prop="mode">
        <el-input v-model="form.mode" />
      </el-form-item>
      <el-form-item :label="`${SHORT_NAME}统计参数`" prop="params">
        <el-input v-model="form.params" />
      </el-form-item>
      <el-form-item label="开始时间" prop="start">
        <el-date-picker
          v-model="form.start"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="开始时间"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="end">
        <el-date-picker
          v-model="form.end"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item label="方式" prop="method">
        <el-input v-model="form.method" />
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
import { SHORT_NAME } from '@/lang/zh.js'

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
      SHORT_NAME,
      form: {
        category: '',
        time: '',
        code: '',
        level: '',
        mode: '',
        params: '',
        start: '',
        method: '',
        end: ''
      },
      formRules: {
        category: [{ required: true, message: '请填写名称', trigger: 'blur' }],
        time: [{ required: true, message: '请填写介绍', trigger: 'blur' }],
        code: [{ required: true, message: '请填写容量', trigger: 'blur' }],
        level: [{ required: true, message: '请填写分类', trigger: 'blur' }],
        mode: [{ required: true, message: '请填写耗时', trigger: 'blur' }],
        params: [{ required: true, message: '请填写类型', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.form.category = 'A型'
      this.form.time = '2022-02-15'
      this.form.code = '202201212ab'
      this.form.level = '1级'
      this.form.mode = '测试模式'
      this.form.params = 'a'
      this.form.start = '2022-04-12 12:10:20'
      this.form.end = '2022-04-16 14:02:19'
      this.form.method = '测试方式'
    } else {
      this.form.category = 'A型1'
      this.form.time = '2022-03-10'
      this.form.code = '20220121ab'
      this.form.level = '1级'
      this.form.mode = '测试模式1'
      this.form.params = 'a'
      this.form.start = '2022-05-21 13:20:10'
      this.form.end = '2022-05-28 13:39:21'
      this.form.method = '测试方式1'
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

