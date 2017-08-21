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
                        <th>Prefix</th>
                        <th>Token</th>
                        <th>Delay</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Process</th>
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
                              <select v-model="item.prefix" name="type">
                                 <option v-for="item in prefixes">{{ item }}</option>
                              </select>
                            </span>
                          </div>
                        </td>
                        <td>
                          <div class="control">
                            <span class="select is-small">
                              <input class="input is-small" type="number" v-model="item.token" placeholder="0">
                            </span>
                          </div>
                        </td>
                        <td>
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
                              <select v-model="item.status" name="type">
                                 <option v-for="item in listStatus">{{ item }}</option>
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
                          <a @click='updateSmsc(item)' class="button is-success is-small"><span class="icon is-small"> <i class="fa fa-close"></i></span><span>Save</span></a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
              </tab-pane>
              <tab-pane label="Statistic">
              </tab-pane>
              <tab-pane label="Manage">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <h1 class="title">DATA SMSC</h1>
          <h2 class="subtitle">Manage list SMSC client</h2>
<hr/>
          <div class="columns">
            <div class="column">
              <div class="control">
                <label class="label">ID</label>
                <input class="input" v-model="id" placeholder="ID smsc" disabled></input>
              </div>
              <div class="control">
                <label class="label">Port</label>
                <input class="input" v-model="port" placeholder="Device Port" disabled></input>
              </div>
              <div class="control">
                <label class="label">Msisdn</label>
                <input class="input" v-model="msidn" placeholder="MSISDN Number"disabled></input>
              </div>
            </div>
            <div class="column">
              <div class="control">
                <label class="label">Prefix</label>
                <span class="select">
                  <select v-model="prefix" name="prefix">
                     <option v-for="prefix in prefixes">{{ prefix }}</option>
                  </select>
                </span>
              </div>
              <div class="control">
                <label class="label">Priority</label>
                <input class="input" v-model="priority" placeholder="Prefix Operator"></input>
              </div>
              <div class="control">
                <label class="label">Delay</label>
                <input class="input" type="number" v-model="delay" placeholder="Delay Time"></input>
              </div>
              <div class="control">
                <label class="label">Token</label>
                <input class="input" type="number" v-model="token" placeholder="Balance Token"></input>
              </div>
            </div>
            <div class="column">
              <div class="control">
                <label class="label">Status</label>
                <span class="select">
                  <select v-model="status" name="status">
                     <option v-for="status in statuses">{{ status }}</option>
                  </select>
                </span>
              </div>
              <div class="control">
                <label class="label">Priority</label>
                <input class="input" type="number" v-model="priority" placeholder="Priority Device"></input>
              </div>
            </div>
          </div>
          <p class="control">
          <button class="button is-primary" @click='updateData()' v-bind:disabled="enableButton">{{ buttonText }}</button>
              <button class="button is-link" @click='clearData()'>Cancel</button>
					</p>
<hr/>
<br/>
									<h2 class="subtitle">List SMSC</h2>
									<table class="table is-bordered is-striped is-narrow">
										<thead>
										<tr>
											<th>ID</th>
											<th>MSISDN</th>
											<th>Prefix</th>
											<th>Token</th>
											<th>Delay</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <!--<th>Process</th>-->
                      </tr>
                      </thead>
                      <tbody>
                        <tr :class="['row', { selected: selectedItems.indexOf(item) !== 1  }]"  v-for="item in smsc" @click="toggle(item)">
                        <td>{{ item.id }}</td>
                        <td>{{ item.msidn }}</td>
                        <td>{{ item.prefix }}</td>
                        <td>{{ item.token }}</td>
                        <td>{{ item.delay }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.priority }}</td>
                      </tr>
                      </tbody>
                    </table>
        </article>
      </div>
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
        this.enableButton = true
        this.buttonText = 'Edit'
      },
      updateData () {
        this.$http({
          url: 'http://5.189.176.218:10800/smsc',
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
          url: 'http://5.189.176.218:10800/smsc',
          method: 'get'
        }).then((response) => {
          this.smsc = _.sortBy(response.data, 'id')
        }).catch((error) => {
          console.log(error)
        })
      },
      updateSmsc: function (item) {
        console.log(item)
        this.$http({
          url: 'http://5.189.176.218:10800/smsc',
          method: 'put',
          data: {
            in_seq: item.in_seq,
            id: item.id,
            port: item.port,
            msidn: item.msidn,
            prefix: item.prefix,
            token: item.token,
            delay: item.delay,
            status: item.status,
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
