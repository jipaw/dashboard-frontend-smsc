<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
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
        }]
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
      refreshDataQueue () {
        this.$http({
          url: this.$baseurl + '/sms-queue',
          method: 'get'
        }).then((response) => {
          this.items1 = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      setFailed (item) {
        var itemIndex = this.selectedItems.indexOf(item)
        if (itemIndex !== -1) {
          this.selectedItems.splice(itemIndex, 1)
        } else {
          this.selectedItems.shift()
          this.selectedItems.push(item)
          this.$http({
            url: this.$baseurl + '/sms/setFailed',
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
      }
    },

    mounted () {
    }
  }
</script>

<style lang="scss" scoped>
.table td {
  font-weight: 400;
  font-size: small; 
}
</style>
