<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
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
        selectedItems: [],
        numberResend: null,
        numbers: [10, 25, 50, 100]
      }
    },

    computed: {
      today () {
        return new Date()
      }
    },
    watch: {
    },
    methods: {
      refreshDataFailed () {
        this.$http({
          url: this.$baseurl + '/sms-failed',
          method: 'get'
        }).then((response) => {
          this.items2 = response.data
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
            url: this.$baseurl + '/sms/resendId',
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
            url: this.$baseurl + '/sms/setDelete',
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
      bulkResend () {
        this.$http({
          url: this.$baseurl + '/sms/bulk',
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
      // this.$http({
      //   url: this.$baseurl + '/sms-queue',
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
