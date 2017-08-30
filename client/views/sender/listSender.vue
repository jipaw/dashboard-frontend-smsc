<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
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
      updateSmsc: function (item) {
        console.log(item)
        this.$http({
          url: this.$baseurl + '/smsc',
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
