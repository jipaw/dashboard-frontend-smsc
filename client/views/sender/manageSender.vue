<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
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
        prefixes: ['["TSEL"]', '["ISAT"]', '["XL"]', '["THREE"]', '["TSEL","XL"]', '["XL","ISAT"]', '["TSEL","XL","ISAT"]', '["ISAT","XL","THREE"]', '["XL","ISAT","SMART"]', '["TSEL","XL","ISAT","SMART"]', '["ISAT","XL","THREE","SMART"]']
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
