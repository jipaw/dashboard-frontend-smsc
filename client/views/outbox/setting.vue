<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <article class="tile is-child box">
            <div class="columns">
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
          url: this.$baseurl + '/sms/autoProcess',
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
          url: this.$baseurl + '/sms/autoResend',
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
          url: this.$baseurl + '/sms/maintenanceMode',
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
          url: this.$baseurl + '/sms/passthroughMode',
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
          url: this.$baseurl + '/setting/main',
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
          url: this.$baseurl + '/setting/trx',
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
          url: this.$baseurl + '/smsc/status',
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
          url: this.$baseurl + '/smsc/status',
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
          url: this.$baseurl + '/setting/trx',
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
      }
    },

    mounted () {
      this.mainSetting()
    }
  }
</script>

<style lang="scss" scoped>
.table td {
  font-weight: 400;
  font-size: small; 
}
</style>
