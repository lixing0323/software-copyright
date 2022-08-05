import Layout from '@/layout/index'

const dataRouter = {
  path: '/platform/data',
  component: Layout,
  redirect: '/platform/data/list',
  name: 'PlatformData',
  meta: { title: '数据采集', breadcrumb: false, icon: 'drag' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/data/list'),
      name: 'PlatformDataList',
      meta: { title: 'data' }
    }
  ]
}

export default dataRouter
