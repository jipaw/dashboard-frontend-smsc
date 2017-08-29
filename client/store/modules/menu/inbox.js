import lazyLoading from './lazyLoading'

export default {
  meta: {
    icon: 'fa-comment-o',
    expanded: false,
    label: 'Inbox'
  },

  children: [
    {
      name: 'Message In',
      path: '/inbox',
      meta: {
        auth: true,
        link: 'inbox/index.vue'
      },
      component: lazyLoading('inbox/index')
    }
  ]
}
