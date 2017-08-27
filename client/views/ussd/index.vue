<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
            <tabs type="toggle" :is-fullwidth="true" alignment="centered">
              <tab-pane label="MSISDN"selected>
                    <h5 class="subtitle is-bold">List Sender</h5>
                    <table class="table is-bordered is-striped is-narrow">
                      <thead>
                      <tr>
                        <th>ID</th>
                        <th>MSISDN</th>
                        <th>Status</th>
                        <th>Balance</th>
                        <th>SMS Packet</th>
                        <!-- <th>Delay</th>
                        <th>Priority</th>
                        <th>Process</th> -->
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in smsc">
                        <td>{{ item.id }}</td>
                        <td>
                          <div class="control">
                            <span class="select is-small">
                              <input class="input is-small" type="number" v-model="item.msidn" placeholder="0">
                            </span>
                          </div>
                        </td>
                        <td>
                          <div class="control">
                            <span class="select is-small">
                              <select v-model="item.status" name="type">
                                 <option v-for="item in listStatus">{{ item }}</option>
                              </select>
                            </span>
                          </div>
                        </td>
                        <td>
                          <div class="control">
                            <p class="control has-addons">
                              <input class="input is-small" type="text" v-model="item.ussd_balance" placeholder="USSD Balance">
                              <a class="button is-info is-small" @click='sendUssdBalance(item)'>Send</a>
                            </p>
                          </div>
                        </td>
                        <td>
                          <div class="control">
                            <p class="control has-addons">
                            <input class="input is-small" type="text" v-model="item.ussd_packet" placeholder="SMS Packet">
                              <a class="button is-info is-small" @click='sendUssdPacket(item)'>Send</a>
                            </p>
                          </div>
                        </td>
                        <!-- <td>
                          <div class="control">
                            <span class="select is-small">
                              <select v-model="item.delay" name="type">
                                 <option v-for="item in listDelay">{{ item }}</option>
                              </select>
                            </span>
                          </div>
                        </td>
                        <td>
                          <div class="control">
                            <span class="select is-small">
                              <select v-model="item.active" name="type">
                                 <option v-for="item in listPriority">{{ item }}</option>
                              </select>
                            </span>
                          </div>
                        </td>
                        <td>
                          <a @click='updateSmsc(item)' class="button is-success is-small"><span class="icon is-small"> <i class="fa fa-close"></i></span><span>Send</span></a>
                        </td> -->
                      </tr>
                      </tbody>
                    </table>
              </tab-pane>
            </tabs>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  import { Tabs, TabPane } from 'vue-bulma-tabs'
  import _ from 'lodash'

  export default {
    components: {
      Tabs,
      TabPane
    },

    data () {
      return {
        smsc: [{
          in_seq: null,
          id: null,
          port: null,
          msidn: null,
          prefix: null,
          token: null,
          delay: null,
          status: null,
          active: null
        }],
        listStatus: ['online', 'offline'],
        listPriority: [1, 2, 3],
        listDelay: [3, 5, 8],
        selectedItems: [],
        enableButton: true,
        buttonText: 'Edit',
        id: null,
        port: null,
        msidn: null,
        prefix: null,
        delay: null,
        token: null,
        status: null,
        priority: null,
        ussd_balance: null,
        ussd_packet: null,
        statuses: ['online', 'offline'],
        prefixes: ['["TSEL"]', '["ISAT"]', '["XL"]', '["THREE"]', '["TSEL","XL"]', '["XL","ISAT"]', '["TSEL","XL","ISAT"]', '["ISAT","XL","THREE"]', '["TSEL","XL","ISAT","SMART"]', '["ISAT","XL","THREE","SMART"]']
      }
    },

    computed: {
      today () {
        return new Date()
      }
    },

    methods: {
      toggle (item) {
        var itemIndex = this.selectedItems.indexOf(item)
        if (itemIndex !== -1) {
          this.selectedItems.splice(itemIndex, 1)
        } else {
          this.selectedItems.shift()
          this.selectedItems.push(item)
          this.id = this.selectedItems[0].id
          this.port = this.selectedItems[0].port
          this.msidn = this.selectedItems[0].msidn
          this.prefix = this.selectedItems[0].prefix
          this.token = this.selectedItems[0].token
          this.delay = this.selectedItems[0].delay
          this.ussd_balance = this.selectedItems[0].ussd_balance
          this.ussd_packet = this.selectedItems[0].ussd_packet
          this.status = this.selectedItems[0].status
          this.priority = this.selectedItems[0].priority
          this.enableButton = false
          this.buttonText = 'Save'
          console.log(this.selectedItems[0].msidn)
        }
      },
      clearData () {
        this.id = null
        this.port = null
        this.msidn = null
        this.prefix = null
        this.token = null
        this.delay = null
        this.status = null
        this.priority = null
        this.ussd_balance = null
        this.ussd_packet = null
        this.enableButton = true
        this.buttonText = 'Edit'
      },
      updateData () {
        this.$http({
          url: this.$baseurl + '/smsc',
          method: 'put',
          data: {

          }
        }).then((response) => {
          this.items = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      refreshData () {
        this.$http({
          url: this.$baseurl + '/smsc',
          method: 'get'
        }).then((response) => {
          this.smsc = _.sortBy(response.data, 'id')
        }).catch((error) => {
          console.log(error)
        })
      },
      sendUssdPacket: function (item) {
        console.log(item)
        this.$http({
          url: this.$baseurl + '/ussd',
          method: 'post',
          data: {
            msidn: item.msidn,
            ussd: item.ussd_packet,
            active: item.active
          }
        }).then((response) => {
          console.log(response.data)
          this.refreshData()
        }).catch((error) => {
          console.log(error)
        })
      },
      sendUssdBalance: function (item) {
        console.log(item)
        this.$http({
          url: this.$baseurl + '/ussd',
          method: 'post',
          data: {
            msidn: item.msidn,
            ussd: item.ussd_balance,
            active: item.active
          }
        }).then((response) => {
          console.log(response.data)
          this.refreshData()
        }).catch((error) => {
          console.log(error)
        })
      }
    },

//    watch: {
//      value (newVal, oldVal) {
//        console.log(newVal, oldVal)
//      }
//    },

    mounted () {
      this.refreshData()
    }
  }
</script>

<style lang="scss" scoped>
</style>
