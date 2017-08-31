import lazyLoading from './lazyLoading'

export default {
  meta: {
    icon: 'fa-wrench',
    expanded: false,
    label: 'Setting'
  },

  children: [
    {
      name: 'Main',
      path: '/setting/main',
      meta: {
        auth: true,
        link: 'setting/main.vue'
      },
      component: lazyLoading('setting/main')
    },
    {
      name: 'Tools',
      path: '/setting/tools',
      meta: {
        auth: true,
        link: 'setting/tools.vue'
      },
      component: lazyLoading('setting/tools')
    }
  ]
}
