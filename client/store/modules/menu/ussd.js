import lazyLoading from './lazyLoading'

export default {
  meta: {
    icon: 'fa-shield',
    expanded: false,
    label: 'Sender'
  },

  children: [
    {
      name: 'List Sender',
      path: '/sender/list',
      meta: {
        auth: true,
        link: 'sender/listSender.vue'
      },
      component: lazyLoading('sender/listSender')
    },
    {
      name: 'Manage Sender',
      path: '/sender/manage',
      meta: {
        auth: true,
        link: 'sender/manageSender.vue'
      },
      component: lazyLoading('sender/manageSender')
    },
    {
      name: 'USSD Command',
      path: '/sender/ussd',
      meta: {
        auth: true,
        link: 'sender/ussd.vue'
      },
      component: lazyLoading('sender/ussd')
    }
  ]
}
