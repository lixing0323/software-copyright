export default {
  props: {
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    onCreate(data) {
      this.$message({ message: '新建成功!', duration: 5000, type: 'success' })
      setInterval(() => {
        this.dialogVisible = false
      }, 5000)
    },
    onEdit(data) {
      this.$message({ message: '编辑成功!', duration: 5000, type: 'success' })
      setInterval(() => {
        this.dialogVisible = false
      }, 5000)
    }
  }
}

