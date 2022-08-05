import Layout from '@/layout/index'

const logRouter = {
  path: '/platform/log',
  component: Layout,
  redirect: '/platform/log/list',
  name: 'PlatformLog',
  meta: { title: '数据采集', breadcrumb: false, icon: 'drag' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/log/list'),
      name: 'PlatformLogList',
      meta: { title: 'log' }
    }
  ]
}

export default logRouter
