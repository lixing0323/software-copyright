import Layout from '@/layout/index'

const showRouter = {
  path: '/platform/show',
  component: Layout,
  redirect: '/platform/show/list',
  name: 'PlatformShow',
  meta: { title: '数据采集', breadcrumb: false, icon: 'drag' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/show/list'),
      name: 'PlatformShowList',
      meta: { title: 'show' }
    }
  ]
}

export default showRouter
