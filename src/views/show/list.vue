<template>
  <el-card class="card-container">
    <number-card class="number-card" />
    <bar-chart class="bar-chart" />
  </el-card>
</template>

<script>
import NumberCard from './card'
import BarChart from './chart'

export default {
  components: { NumberCard, BarChart },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.card-container {
  background-color: #eee;
}
.number-card {
}
.bar-chart {
  margin-top: 20px;
}
</style>
