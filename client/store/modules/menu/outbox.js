import lazyLoading from './lazyLoading'

export default {
  meta: {
    icon: 'fa-comments-o',
    expanded: false,
    label: 'Outbox'
  },

  children: [
    {
      name: 'Message Out',
      path: '/outbox',
      meta: {
        auth: true,
        link: 'outbox/index.vue'
      },
      component: lazyLoading('outbox/index')
    }
  ]
}
