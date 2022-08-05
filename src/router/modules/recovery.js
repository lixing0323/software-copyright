import Layout from '@/layout/index'

const recoveryRouter = {
  path: '/platform/recovery',
  component: Layout,
  redirect: '/platform/recovery/list',
  name: 'PlatformRecovery',
  meta: { title: '数据采集', breadcrumb: false, icon: 'drag' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/recovery/list'),
      name: 'PlatformRecoveryList',
      meta: { title: 'platformStatisticsRecovery' }
    }
  ]
}

export default recoveryRouter
