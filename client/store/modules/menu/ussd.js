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
      path: '/msisdn',
      meta: {
        auth: true,
        link: 'smsc/index.vue'
      },
      component: lazyLoading('smsc/index')
    },
    {
      name: 'USSD Command',
      path: '/ussd',
      meta: {
        auth: true,
        link: 'ussd/index.vue'
      },
      component: lazyLoading('ussd/index')
    }
  ]
}
