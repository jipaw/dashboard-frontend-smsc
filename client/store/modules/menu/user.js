import lazyLoading from './lazyLoading'

export default {
  meta: {
    icon: 'fa-user-circle-o',
    expanded: false,
    label: 'Member'
  },

  children: [
    {
      name: 'List Users',
      path: '/accounts',
      meta: {
        auth: true,
        link: 'user/listUser.vue'
      },
      component: lazyLoading('user/listUser')
    }
  ]
}
