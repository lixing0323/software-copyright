<template>
  <div>
    <ht-dialog :visible.sync="dialogVisible" width="600px" title="新建信息" @close="dialogVisible=false">
      <create-form :is-edit="false" @submit="onCreate" @close="dialogVisible=false" />
    </ht-dialog>
  </div>
</template>

<script>
import formMixin from '@/views/mixins/formMixin'
import CreateForm from './form'

export default {
  components: { CreateForm },
  mixins: [formMixin],
  props: {
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

