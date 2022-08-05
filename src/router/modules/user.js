import Layout from '@/layout/index'

const userRouter = {
  path: '/platform/user',
  component: Layout,
  redirect: '/platform/user/list',
  name: 'PlatformUser',
  meta: { title: '数据采集', breadcrumb: false, icon: 'drag' },
  children: [
    {
      path: 'list',
      component: () => import('@/views/user/list'),
      name: 'PlatformUserList',
      meta: { title: 'user' }
    }
  ]
}

export default userRouter
