import lazyLoading from './lazyLoading'

export default {
  meta: {
    icon: 'fa-comments-o',
    expanded: false,
    label: 'Outbox'
  },

  children: [
    {
      name: 'Queue',
      path: '/queue',
      meta: {
        auth: true,
        link: 'outbox/queue.vue'
      },
      component: lazyLoading('outbox/queue')
    },
    {
      name: 'Resend',
      path: '/resend',
      meta: {
        auth: true,
        link: 'outbox/resend.vue'
      },
      component: lazyLoading('outbox/resend')
    }
  ]
}
