<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <tabs type="toggle" :is-fullwidth="true" alignment="centered" size="large">
              <tab-pane label="List"selected>
                    <h5 class="subtitle">List Member</h5>
                    <table class="table is-bordered is-striped is-narrow">
                      <thead>
                      <tr>
                        <th>No</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>UUID</th>
                        <th>Token</th>
                        <th>Registration Date</th>
                        <!--<th>Process</th>-->
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in items">
                        <td>{{ item.id }}</td>
                        <td>{{ item.username }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.type }}</td>
                        <td>{{ item.uuid }}</td>
                        <td>{{ item.token }}</td>
                        <td>{{ item.reg_date }}</td>
                      </tr>
                      </tbody>
                    </table>
              </tab-pane>
              <tab-pane label="Statistic" >
              </tab-pane>
              <tab-pane label="Manage">
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <h1 class="title">DATA USER</h1>
                    <h2 class="subtitle">Manage list user</h2>
          <hr/>
                   <div class="columns">
                      <div class="column">
                        <div class="control">
                          <label class="label">Username</label>
                          <input class="input" v-model="username" placeholder="Username"></input>
                        </div>
                        <div class="control">
                          <label class="label">Name</label>
                          <input class="input" v-model="name" placeholder="name"></input>
                        </div>
                        <div class="control">
                          <label class="label">UUID</label>
                          <input class="input" v-model="uuid" placeholder="UUID"disabled></input>
                      </div>
                    </div>
                      <div class="column">
                        <div class="control">
                          <label class="label">Type</label>
                          <span class="select">
                            <select v-model="type" name="type">
                               <option v-for="type in types">{{ type }}</option>
                            </select>
                          </span>
                        </div>
                        <div class="control">
                          <label class="label">Token</label>
                          <input class="input" type="number" v-model="token" placeholder="Balance token"></input>
                        </div>
                        <div class="control">
                          <label class="label">Last Login</label>
                          <input class="input" type="text" v-model="last_login" placeholder="Last login" disabled></input>
                        </div>
                      </div>
                    </div>
                    <p class="control">
                      <button class="button is-primary" @click='createUser()' v-bind:disabled="enableButtonNew">{{ buttonNew }}</button>
                      <button class="button is-primary" @click='updateUser()' v-bind:disabled="enableButton">{{ buttonEdit}}</button>
                      <button class="button is-danger" @click='deleteUser()' v-bind:disabled="enableButton">{{ buttonDelete }}</button>
                      <button class="button is-link" @click='clearData()'>Cancel</button>
                    </p>
                    <hr/>
                    <br/>
                      <h5 class="subtitle">List Member</h5>
                      <table class="table is-bordered is-striped is-narrow">
                        <thead>
                        <tr>
                          <th>No</th>
                          <th>Username</th>
                          <th>Name</th>
                          <th>Type</th>
                          <th>UUID</th>
                          <th>Token</th>
                          <th>Registration Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :class="['row', { selected: selectedItems.indexOf(item) !== 1  }]"  v-for="item in items" @click="toggle(item)">
                          <td>{{ item.id }}</td>
                          <td>{{ item.username }}</td>
                          <td>{{ item.name }}</td>
                          <td>{{ item.type }}</td>
                          <td>{{ item.uuid }}</td>
                          <td>{{ item.token }}</td>
                          <td>{{ item.reg_date }}</td>
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

  export default {
    components: {
      Tabs,
      TabPane
    },

    data () {
      return {
//        value: {
//          startDate: null,
//          endDate: null
//        },
        items: [{
          id: null,
          username: null,
          name: null,
          uuid: null,
          type: null,
          registration_date: null,
          token: null
        }],
        selectedItems: [],
        enableButton: true,
        enableButtonNew: false,
        buttonNew: 'Create',
        buttonEdit: 'Edit',
        buttonDelete: 'Delete',
        username: null,
        id: null,
        name: null,
        uuid: null,
        type: null,
        token: null,
        last_login: null,
        types: ['admin', 'user']
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
          this.username = this.selectedItems[0].username
          this.name = this.selectedItems[0].name
          this.type = this.selectedItems[0].type
          this.uuid = this.selectedItems[0].uuid
          this.token = this.selectedItems[0].token
          this.last_login = this.selectedItems[0].registration_date
          this.enableButton = false
          this.enableButtonNew = true
          this.buttonEdit = 'Save'
        }
      },
      clearData () {
        this.username = null
        this.name = null
        this.type = null
        this.uuid = null
        this.token = null
        this.last_login = null
        this.enableButton = true
        this.enableButtonNew = false
        this.buttonEdit = 'Edit'
      },
      createUser () {
        this.$http({
          url: 'http://5.189.176.218:10800/user',
          method: 'post',
          data: {

          }
        }).then((response) => {
          this.items = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      updateUser () {
        this.$http({
          url: 'http://5.189.176.218:10800/user',
          method: 'put',
          data: {

          }
        }).then((response) => {
          this.items = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      deleteUser () {
        this.$http({
          url: 'http://5.189.176.218:10800/user',
          method: 'delete'
        }).then((response) => {
          this.items = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
    },

    mounted () {
      this.$http({
        url: 'http://5.189.176.218:10800/users',
        method: 'get'
      }).then((response) => {
        this.items = response.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style lang="scss" scoped>
</style>
