import lazyLoading from './lazyLoading'

export default {
  meta: {
    icon: 'fa-pie-chart',
    expanded: false,
    label: 'Report'
  },

  children: [
    {
      name: 'Daily',
      path: '/report/daily',
      meta: {
        auth: true,
        link: 'report/daily.vue'
      },
      component: lazyLoading('report/daily')
    },
    {
      name: 'Monthly',
      path: '/report/monthly',
      meta: {
        auth: true,
        link: 'report/monthly.vue'
      },
      component: lazyLoading('report/monthly')
    }
  ]
}
