import Layout from '@/layout/index'

const configRouter = {
  path: '/platform/config',
  component: Layout,
  redirect: '/platform/config/list',
  name: 'PlatformConfig',
  meta: { title: '数据采集', breadcrumb: false, icon: 'drag' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/config/list'),
      name: 'PlatformConfigList',
      meta: { title: 'platformStatisticsConfig' }
    }
  ]
}

export default configRouter
