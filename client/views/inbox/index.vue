<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <div class="columns">
            <div class="column">
              <p class="control has-addons">
              <h5 class="subtitle has-text-left"> <a @click='loadInbox()' class=""><i class="fa fa-spinner fa-2x fa-fw"></i></a> Log SMS INBOX</h5>
              <h5 class="subtitle has-text-right"> Filter Inbox 
                <span class="select is-small">
                  <input class="input is-small" type="text" placeholder="Sender"></input>
                </span>
                <span class="select is-small">
                  <input class="input is-small" type="text" placeholder="Date start"></input>
                </span>
                <span class="select is-small">
                  <input class="input is-small" type="text" placeholder="Date end"></input>
                </span>
                <a @click='filterSms()' class="button is-small is-success"><span class="icon is-small"> <i class="fa fa-spinner"></i></span><span>Filter</span></a></h5>
              </h5>
            </div>
          </div>
              <table class="table is-bordered is-striped is-narrow">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Sender</th>
                  <th>Time</th>
                  <th>Message</th>
                  <th>Chip</th>
                  <th>Process</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in inboxes">
                  <td>{{ item.id}}</td>
                  <td>{{ item.sender }}</td>
                  <td>{{ item.time }}</td>
                  <td>{{ item.text }}</td>
                  <td>{{ item.msisdn }}</td>
                  <td>
                    <a @click='deleteInbox(item)' class="button is-danger is-small"><span class="icon is-small"> <i class="fa fa-close"></i></span><span>Delete</span></a>
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
        inboxes: [{
          id: null,
          sender: null,
          smsc: null,
          text: null,
          time: null,
          msisdn: null,
          tpdu_type: null
        }],
        selectedItems: []
      }
    },

    computed: {
    },
    watch: {
    },
    methods: {
      loadInbox () {
        this.$http({
          url: this.$baseurl + '/inboxes/log',
          method: 'get'
        }).then((response) => {
          this.inboxes = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      deleteInbox (item) {
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
      filterSms () {

      }
    },

    mounted () {
      this.loadInbox()
    }
  }
</script>

<style lang="scss" scoped>
.table td {
  font-weight: 400;
  font-size: small; 
}
</style>
