<template>
  <div>
    <ht-dialog :visible="dialogVisible" width="600px" title="编辑信息" @close="dialogVisible=false">
      <edit-form :is-edit="true" @submit="onEdit" @close="dialogVisible=false" />
    </ht-dialog>
  </div>
</template>

<script>
import formMixin from '@/views/mixins/formMixin'
import EditForm from './form'

export default {
  components: { EditForm },
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

