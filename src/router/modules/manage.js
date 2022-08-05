import Layout from '@/layout/index'

const manageRouter = {
  path: '/platform/manage',
  component: Layout,
  redirect: '/platform/manage/list',
  name: 'PlatformManage',
  meta: { title: '数据采集', breadcrumb: false, icon: 'drag' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/manage/list'),
      name: 'PlatformManageList',
      meta: { title: 'platformStatisticsManagement' }
    }
  ]
}

export default manageRouter
