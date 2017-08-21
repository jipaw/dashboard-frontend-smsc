<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <tabs type="toggle" animation="fade" :only-fade="false" :is-fullwidth="true" alignment="centered">
              <tab-pane label="Queue" selected>
                <h5 class="subtitle"> <a @click='refreshDataQueue()' class=""><i class="fa fa-spinner fa-2x fa-fw"></i></a>  Queue SMS</h5>
                    <table class="table is-bordered is-striped is-narrow">
                      <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Destination</th>
                        <th>Message</th>
                        <th>Chip Sender</th>
                        <th>Status</th>
                        <th>Process</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in items1">
                        <td>{{ item.user_name }}</td>
                        <td>{{ item.in_time }}</td>
                        <td>{{ item.destination }}</td>
                        <td>{{ item.message }}</td>
                        <td>{{ item.chip_sender }}</td>
                        <td>{{ item.flag }}</td>
                        <td>
                          <a @click='setFailed(item)' class="button is-danger is-small"><span class="icon is-small"> <i class="fa fa-close"></i></span><span>Delete</span></a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
              </tab-pane>
              <tab-pane label="Resend" >
                <div class="columns">
                  <div class="column">
                    <h5 class="subtitle"> <a @click='refreshDataFailed()' class=""><i class="fa fa-spinner fa-2x fa-fw"></i></a>Refresh Data</h5>
                  </div>
                  <div class="column">
                    <p class="control has-addons">
                    <h5 class="subtitle has-text-right"> Bulk Resend
                        <span class="select is-small">
                          <select v-model="numberResend" name="numberResend">
                            <option v-for="numberResend in numbers">{{ numberResend }}</option>
                          </select>
                        </span>
                        <a @click='bulkResend()' class="button is-small is-success"><span class="icon is-small"> <i class="fa fa-spinner"></i></span><span>Resend</span></a></h5>
                    </p>
                  </div>
                </div>
                <table class="table is-bordered is-striped is-narrow">
                  <thead>
                  <tr>
                    <th>User</th>
                    <th>Date</th>
                    <th>Destination</th>
                    <th>Message</th>
                    <th>Chip Sender</th>
                    <th>Status</th>
                    <th>Process</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in items2">
                    <td>{{ item.user_name }}</td>
                    <td>{{ item.in_time }}</td>
                    <td>{{ item.destination }}</td>
                    <td>{{ item.message }}</td>
                    <td>{{ item.chip_sender }}</td>
                    <td>{{ item.flag }}</td>
                    <td>
                        <p class="control has-addons">
                        <a @click='setResend(item)' class="button is-success is-small"><span class="icon is-small"> <i class="fa fa-spinner"></i></span><span>Resend</span></a>
                        <a @click='setDelete(item)' class="button is-danger is-small"><span class="icon is-small"> <i class="fa fa-close"></i></span><span>Delete</span></a>
                      </p>
                    </td>
                  </tr>
                  </tbody>
                </table>
                </tab-pane>
              <tab-pane label="Manage" >
                <article class="tile is-child box">
                  <div class="columns">
                    <!-- <div class="column">
                      <h5 class="subtitle">Change Word</h5>
                      <div class="control">
                      <label class="label">Word Patern</label>
                      <p class="control has-icon has-icon-right">
                      <input class="input" type="text" placeholder=": / Insert word or regular expresion pattern">
                      <span class="icon is-small">
                        <i class="fa fa-flag"></i>
                      </span>
                      </p>
                      <label class="label">Replace word</label>
                      <p class="control has-icon has-icon-right">
                      <input class="input" type="text" placeholder=": / Insert word or regular expresion pattern">
                      <span class="icon is-small">
                        <i class="fa fa-flag"></i>
                      </span>
                      </p>
                      </div>
                    </div> -->
                      <div class="column">
                      <article class="tile is-child box">
                        <p class="subtitle has-text-centered">QUEUE SMS SETTING</p>
                        <div class="columns">
                          <article class="column">
                            <p class="subtitle">Process Interval</p>
                            <p class="control has-addons">
                              <input class="input" type="number" v-model="values.processInterval" placeholder="0">
                              <a @click='setTrx()' class="button is-success">Set Interval</a>
                            </p>
                          </article>
                          <article class="column">
                            <p class="subtitle">Resend Interval</p>
                            <p class="control has-addons">
                              <input class="input" type="number" v-model="values.resendInterval" placeholder="0">
                              <a @click='setTrx()' class="button is-success">Set Interval</a>
                            </p>
                          </article>
                        </div>
                        <div class="columns">
                          <article class="column">
                            <p class="subtitle">Limit Processing</p>
                            <p class="control has-addons">
                              <input class="input" type="number" v-model="values.limitProcess" placeholder="0">
                              <a @click='setTrx()' class="button is-success">Set Limit</a>
                            </p>
                          </article>
                          <article class="column">
                            <p class="subtitle">Max Resend</p>
                            <p class="control has-addons">
                              <input class="input" type="number" v-model="values.maxResend" placeholder="0">
                              <a @click='setTrx()' class="button is-success">Set Max</a>
                            </p>
                          </article>
                        </div>
                          </article>
                  </div>
                    <div class="column">
                      <article class="tile is-child box">
                        <p class="subtitle has-text-centered">QUEUE SMS SETTING</p>
                        <div class="columns">
                          <article class="column">
                            <p class="subtitle">Autoprocess</p>
                            <p><vb-switch checked type="success" size="large" v-model="values.autoProcess">{{ autoProcess }}</vb-switch></p>
                          </article>
                          <article class="column">
                            <p class="subtitle">Autoresend</p>
                            <p><vb-switch checked type="success" size="large" v-model="values.autoResend">{{ autoResend }}</vb-switch></p>
                          </article>
                        </div>
                        <div class="columns">
                          <article class="column">
                            <p class="subtitle">Maintenance Mode</p>
                            <p><vb-switch type="danger" size="large" v-model="values.maintenanceMode">{{ maintenanceMode }}</vb-switch></p>
                          </article>
                          <article class="column">
                            <p class="subtitle">Passthrough Mode</p>
                            <p><vb-switch type="danger" size="large" v-model="values.passthroughMode">{{ passthroughMode }}</vb-switch></p>
                          </article>
                        </div>
                      </article>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <article class="tile is-child box">
                      <h5 class="subtitle">CHECK SMS SENDER</h5>
                      <div class="control">
                      <label class="label">Check all sender</label>
                      <p class="control has-addons">
                         <input class="input" type="number" v-model="values.msisdn" placeholder=": / msisdn">
                         <a @click='sendAllSms()' class="button is-dark">Send SMS</a>
                      </p>
                      <label class="label">Choose Sender</label>
                      <span class="select">
                        <select v-model="device" name="device">
                          <option v-for="device in devices">{{ device }}</option>
                        </select>
                      </span>
                      </div>
                      <p class="control has-addons">
                         <input class="input" type="number" v-model="values.msisdn" placeholder=": / msisdn">
                         <a @click='sendOneSms()' class="button is-dark">Send SMS</a>
                      </p>
                      </article>
                    </div>
                    <div class="column">
                     <article class="tile is-child box">
                      <h5 class="subtitle">WORD PROCESSING</h5>
                      <div class="control">
                      <label class="label">Word Patern</label>
                      <p class="control has-icon has-icon-right">
                      <input class="input" type="text" v-model="word" placeholder=": / Insert word or regular expresion pattern">
                      <span class="icon is-small">
                        <i class="fa fa-flag"></i>
                      </span>
                      </p>
                      <label class="label">Replace word</label>
                      <p class="control has-icon has-icon-right">
                      <input class="input" type="text" v-model="pattern"placeholder=": / Insert word or regular expresion pattern">
                      <span class="icon is-small">
                        <i class="fa fa-flag"></i>
                      </span>
                      </p>
                      </div>
                      <div class="block">
                        <p>
                          <vb-switch type="success" size="large" :checked="value" v-model="value"></vb-switch>
                        </p>
                      </div>
                      </article> 
                    </div>
                  </div>
              </article>  
              </tab-pane>
            </tabs>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
  import { Tabs, TabPane } from 'vue-bulma-tabs'
  import VbSwitch from 'vue-bulma-switch'

  export default {
    components: {
      Tabs,
      TabPane,
      VbSwitch
    },

    data () {
      return {
        items1: [{
          user_name: null,
          in_time: null,
          destination: null,
          message: null,
          trx_id: null,
          reference: null,
          in_stat: null,
          chip_sender: null,
          process: null
        }],
        items2: [{
          user_name: null,
          in_time: null,
          destination: null,
          message: null,
          trx_id: null,
          reference: null,
          in_stat: null,
          chip_sender: null,
          process: null
        }],
        values: {
          autoProcess: true,
          autoResend: true,
          maintenanceMode: false,
          passthroughMode: false,
          processInterval: 8,
          resendInterval: 8,
          limitProcess: 3,
          maxResend: 2,
          msisdn: null
        },
        selectedItems: [],
        numberResend: null,
        numbers: [10, 25, 50, 100],
        device: null,
        devices: ['SMSC-01', 'SMSC-02', 'SMSC-03', 'SMSC-04', 'SMSC-05', 'SMSC-06', 'SMSC-07', 'SMSC-08', 'SMSC-09', 'SMSC-10', 'SMSC-11', 'SMSC-12', 'SMSC-13', 'SMSC-14', 'SMSC-15', 'SMSC-16', 'SMSC-17', 'SMSC-18', 'SMSC-19', 'SMSC-20', 'SMSC-21', 'SMSC-22', 'SMSC-23', 'SMSC-24', 'SMSC-25', 'SMSC-26', 'SMSC-27', 'SMSC-28', 'SMSC-29', 'SMSC-30', 'SMSC-31', 'SMSC-32'],
        user_name: null,
        in_time: null,
        word: null,
        pattern: null,
        refresh: false,
        value: false
      }
    },

    computed: {
      autoProcess: function () {
        // console.log(this.values.autoProcess)
        this.$http({
          url: 'http://5.189.176.218:10800/sms/autoProcess',
          method: 'post',
          data: {
            autoProcess: this.values.autoProcess
          }
        }).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
        return this.values.autoProcess
      },
      autoResend: function () {
        // console.log(this.values.autoResend)
        this.$http({
          url: 'http://5.189.176.218:10800/sms/autoResend',
          method: 'post',
          data: {
            autoResend: this.values.autoResend
          }
        }).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
        return this.values.autoResend
      },
      maintenanceMode: function () {
        // console.log(this.values.maintenanceMode)
        this.$http({
          url: 'http://5.189.176.218:10800/sms/maintenanceMode',
          method: 'post',
          data: {
            maintenanceMode: this.values.maintenanceMode
          }
        }).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
        return this.values.maintenanceMode
      },
      passthroughMode: function () {
        console.log(this.values.passthroughMode)
        this.$http({
          url: 'http://5.189.176.218:10800/sms/passthroughMode',
          method: 'post',
          data: {
            passthroughMode: this.values.passthroughMode
          }
        }).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
        return this.values.passthroughMode
      },
      today () {
        return new Date()
      },
      replaceWord () {
        console.log(this.value)
      }
    },
    watch: {
    },
    methods: {
      mainSetting: function () {
        this.$http({
          url: 'http://5.189.176.218:10800/setting/main',
          method: 'get'
        }).then((response) => {
          // console.log(response.data)
          this.values.autoProcess = response.data.autoProcess
          this.values.autoResend = response.data.autoResend
          this.values.maintenanceMode = response.data.maintenanceMode
          this.values.passthroughMode = response.data.passthroughMode
        }).catch((error) => {
          console.log(error)
        })
      },
      trxSetting: function () {
        this.$http({
          url: 'http://5.189.176.218:10800/setting/trx',
          method: 'get'
        }).then((response) => {
          // console.log(response.data)
          this.values.processInterval = response.data.processInterval
          this.values.resendInterval = response.data.resendInterval
          this.values.limitProcess = response.data.limitProcess
          this.values.maxResend = response.data.maxResend
        }).catch((error) => {
          console.log(error)
        })
      },
      sendAllSms: function () {
        console.log(this.values.msisdn)
        this.$http({
          url: 'http://5.189.176.218:10800/smsc/status',
          method: 'post',
          data: {
            msisdn: this.values.msisdn,
            sender: 'all'
          }
        }).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      },
      sendOneSms: function () {
        console.log(this.device)
        this.$http({
          url: 'http://5.189.176.218:10800/smsc/status',
          method: 'post',
          data: {
            msisdn: this.values.msisdn,
            sender: this.device
          }
        }).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
      },
      setTrx: function () {
        // console.log(this.values.maintenanceMode)
        this.$http({
          url: 'http://5.189.176.218:10800/setting/trx',
          method: 'post',
          data: {
            processInterval: this.values.processInterval,
            resendInterval: this.values.resendInterval,
            limitProcess: this.values.limitProcess,
            maxResend: this.values.maxResend
          }
        }).then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error)
        })
        return this.values.maintenanceMode
      },
      refreshDataFailed () {
        this.$http({
          url: 'http://5.189.176.218:10800/sms-failed',
          method: 'get'
        }).then((response) => {
          this.items2 = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      refreshDataQueue () {
        this.$http({
          url: 'http://5.189.176.218:10800/sms-queue',
          method: 'get'
        }).then((response) => {
          this.items1 = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      setResend (item) {
        var itemIndex = this.selectedItems.indexOf(item)
        if (itemIndex !== -1) {
          this.selectedItems.splice(itemIndex, 1)
        } else {
          this.selectedItems.shift()
          this.selectedItems.push(item)
          this.$http({
            url: 'http://5.189.176.218:10800/sms/resendId',
            method: 'post',
            data: {
              in_stat: this.selectedItems[0].in_stat,
              user_name: this.selectedItems[0].user_name,
              destination: this.selectedItems[0].destination,
              trx_id: this.selectedItems[0].trx_id
            }
          }).then((response) => {
            console.log(response)
            this.refreshDataFailed()
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      setDelete (item) {
        var itemIndex = this.selectedItems.indexOf(item)
        if (itemIndex !== -1) {
          this.selectedItems.splice(itemIndex, 1)
        } else {
          this.selectedItems.shift()
          this.selectedItems.push(item)
          this.$http({
            url: 'http://5.189.176.218:10800/sms/setDelete',
            method: 'post',
            data: {
              in_stat: this.selectedItems[0].in_stat,
              user_name: this.selectedItems[0].user_name,
              destination: this.selectedItems[0].destination,
              trx_id: this.selectedItems[0].trx_id
            }
          }).then((response) => {
            console.log(response)
            this.refreshDataFailed()
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      setFailed (item) {
        var itemIndex = this.selectedItems.indexOf(item)
        if (itemIndex !== -1) {
          this.selectedItems.splice(itemIndex, 1)
        } else {
          this.selectedItems.shift()
          this.selectedItems.push(item)
          this.$http({
            url: 'http://5.189.176.218:10800/sms/setFailed',
            method: 'post',
            data: {
              in_stat: this.selectedItems[0].in_stat,
              user_name: this.selectedItems[0].user_name,
              destination: this.selectedItems[0].destination,
              trx_id: this.selectedItems[0].trx_id
            }
          }).then((response) => {
            console.log(response)
            this.refreshDataQueue()
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      bulkResend () {
        this.$http({
          url: 'http://5.189.176.218:10800/sms/bulk',
          method: 'post',
          data: {
            limit: this.numberResend || 5
          }
        }).then((response) => {
          console.log(response)
          this.refreshDataFailed()
        }).catch((error) => {
          console.log(error)
        })
      }
    },

    mounted () {
      this.mainSetting()
      // this.$http({
      //   url: 'http://5.189.176.218:10800/sms-queue',
      //   method: 'get'
      // }).then((response) => {
      //   // console.log(response.data)
      //   this.items = response.data
      // }).catch((error) => {
      //   console.log(error)
      // })
    }
  }
</script>

<style lang="scss" scoped>
.table td {
  font-weight: 400;
  font-size: small; 
}
</style>
