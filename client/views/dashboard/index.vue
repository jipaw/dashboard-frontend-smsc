<template>
  <div>
    <p class="subtitle">SERVER SUMARRY</p>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="subtitle has-text-centered">Status Server</p>
          <hr>
          <div class="columns">
            <!-- <article class="column">
              <p class="subtitle has-text-centered">Restart SMSC</p>
              <p class="subtitle"><a @click='restartSMSC()' class=""><i class="fa fa-spinner fa-fw"></i></a> Device</p>
            </article> -->
            <article class="column">
              <p class="subtitle has-text-centered">SMS Request</p>
              <p class="title has-text-centered"><span class="title help"><strong>{{ data.sms_request }}</strong></span></p>
            </article>
            <article class="column">
              <p class="subtitle has-text-centered">SMS Sent</p>
              <p class="title has-text-centered"><span class="title help is-success"><strong>{{ data.sms_sent }}</strong></span></p>
            </article>
            <article class="column">
              <p class="subtitle has-text-centered">SMS Failed</p>
              <p class="title has-text-centered"><span class="title help is-danger"><strong>{{ data.sms_failed}}</strong></span></p>
            </article>
            <article class="column">
              <p class="subtitle has-text-centered">Queue Inbox</p>
              <p class="title has-text-centered"><span class="title help is-warning"><strong>{{ data.sms_queue_in}}</strong></span></p>
            </article>
            <article class="column">
              <p class="subtitle has-text-centered">Queue Process</p>
              <p class="title has-text-centered"><span class="title help is-primary"><strong>{{ data.sms_process}}</strong></span></p>
            </article>
            <article class="column">
              <p class="subtitle has-text-centered">Queue Resend</p>
              <p class="title has-text-centered"><span class="title help is-danger"><strong>{{ data.sms_resend_in }}</strong></span></p>
            </article>
          </div>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <!-- <p><vb-switch type="success" :checked="Boolean(refreshData)" v-model="refreshData"></vb-switch>{{ refreshData }}</p> -->
          <h5 class="subtitle"> <a @click='refreshDashboard()' class=""><i class="fa fa-spinner fa-fw"></i></a>Log Provider SMS</h5>
          <table class="table is-bordered is-striped is-narrow">
            <thead>
            <tr>
              <th>Log time</th>
              <th>Message</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="log in logs">
              <td>{{ log.time }}</td>
              <td>[LOG {{ log.message.user }} ] | {{ log.message.destination }} | {{ log.message.flag }} | {{ log.message.smsc }} {{ log.message.chip_sender }} | {{ log.message.text }}</td>
            </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>

  </div>
</template>

<script>
import VbSwitch from 'vue-bulma-switch'
import _ from 'lodash'
import moment from 'moment'

export default {
  components: {
    VbSwitch
  },

  data () {
    return {
      values: {
        autoProcess: true,
        autoResend: true,
        maintenanceMode: false,
        passthroughMode: false
      },
      data: {
        username: null,
        sms_request: 0,
        sms_queue_in: 0,
        sms_process: 0,
        sms_sent: 0,
        sms_resend_in: 0,
        sms_failed: 0
      },
      value: true,
      refreshData: false,
      logs: [{
        time: null,
        message: {
          text: null,
          destination: null,
          user: null,
          trxid: null,
          reference: null,
          flag: null,
          delay: null,
          counter: null,
          smsc: null,
          chip_sender: null
        }
      }]
    }
  },
  watch: {
    refreshData: function (val) {
      console.log(val)
      let mytimer = setInterval(() => {
        this.getTrx()
        this.getLogs()
      }, 10000)
      function stopRefresh () {
        clearInterval(mytimer)
      }
      if (val === false) {
        stopRefresh()
      }
    }
  },
  computed: {
    today: function () {
      let data = new Date()
      var yyyy = data.getFullYear().toString()
      var mm = (data.getMonth() + 1).toString()
      var dd = data.getDate().toString()

      var mmChars = mm.split('')
      var ddChars = dd.split('')

      return yyyy + '-' + (mmChars[1] ? mm : '0' + mmChars[0]) + '-' + (ddChars[1] ? dd : '0' + ddChars[0])
    },
    placeholder () {
      return `minDate: today, maxDate: ${this.maxDate.getFullYear()}-${this.maxDate.getMonth() + 1}-${this.maxDate.getDate()}`
    }
  },

  methods: {
    getTrx: function () {
      this.$http({
        url: this.$baseurl + '/dashboard',
        method: 'get'
      }).then((response) => {
        // console.log(response)
        this.data = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    getLogs: function () {
      this.$http({
        url: this.$baseurl + '/provider/logs',
        method: 'get'
      }).then((response) => {
        let logData = _.map(response.data, (item) => {
          return _.extend(item, {
            time: moment(item.log_time).format('YYYY-MM-DD HH:mm:ss'),
            message: JSON.parse(item.log_message)
          })
        })
        this.logs = logData
      }).catch((error) => {
        console.log(error)
      })
    },
    restartSMSC: function () {
      this.$http({
        url: this.$baseurl + '/smsc/restart',
        method: 'get'
      }).then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
    },
    refreshDashboard: function () {
      this.getTrx()
      this.getLogs()
    },
    autoRefresh: function () {
      if (this.refreshData) {
        setInterval(() => {
          this.getTrx()
          this.getLogs()
        }, 10000)
      }
    }
  },

  mounted () {
    this.getTrx()
    this.getLogs()
  }
}
</script>

<style lang="scss" scoped>
</style>
