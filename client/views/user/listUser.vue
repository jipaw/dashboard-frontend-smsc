<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
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
              <th>Process</th>
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
              <td>{{ item.reg_date }}</td>
            </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    components: {
    },

    data () {
      return {
        items: [{
          id: null,
          username: null,
          name: null,
          uuid: null,
          type: null,
          registration_date: null,
          token: null
        }]
      }
    },

    computed: {
      today () {
        return new Date()
      }
    },

    methods: {

    },

    mounted () {
      this.$http({
        url: this.$baseurl + '/users',
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
