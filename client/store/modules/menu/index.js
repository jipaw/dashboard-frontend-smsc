import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
// import dashboard from './dashboard'
import outbox from './outbox'
import inbox from './inbox'
import ussd from './ussd'
import user from './user'
// import uifeatures from './uifeatures'
// import components from './components'
// import tables from './tables'

// show: meta.label -> name
// name: component name
// meta.label: display label

const state = {
  items: [
    {
      name: 'Dashboard',
      path: '/dashboard',
      meta: {
        auth: true,
        icon: 'fa-server',
        link: 'dashboard/index.vue'
      },
      component: lazyLoading('dashboard', true)
    },
    user,
    outbox,
    inbox,
    ussd
    // {
    //   name: 'SMS OUT',
    //   path: '/sms',
    //   meta: {
    //     auth: true,
    //     icon: 'fa-bar-chart',
    //     link: 'sms/index.vue'
    //   },
    //   component: lazyLoading('sms', true)
    // },
    // {
    //   name: 'SMS IN',
    //   path: '/inbox',
    //   meta: {
    //     auth: true,
    //     icon: 'fa-bar-chart',
    //     link: 'inbox/index.vue'
    //   },
    //   component: lazyLoading('inbox', true)
    // },
    // {
    //   name: 'SMSC',
    //   path: '/smsc',
    //   meta: {
    //     auth: true,
    //     icon: 'fa-power-off',
    //     link: 'smsc/index.vue'
    //   },
    //   component: lazyLoading('smsc', true)
    // },
    // {
    //   name: 'USSD',
    //   path: '/ussd',
    //   meta: {
    //     auth: true,
    //     icon: 'fa-power-off',
    //     link: 'ussd/index.vue'
    //   },
    //   component: lazyLoading('ussd', true)
    // },
    // {
    //   name: 'User',
    //   path: '/user',
    //   meta: {
    //     auth: true,
    //     icon: 'fa-users',
    //     link: 'user/index.vue'
    //   },
    //   component: lazyLoading('user', true)
    // }
    // charts,
    // uifeatures,
    // components,
    // tables
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
