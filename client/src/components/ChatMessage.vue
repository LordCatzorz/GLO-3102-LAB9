<template>
  <tr v-bind:class="this.GetClass()">
    <td>{{ GetTimeOfMessage() }}</td>
    <td>&nbsp;&nbsp;</td>
    <td>
      <div class="username">
        {{ GetUser() }}
      </div>
      <div>
        {{ GetMessage() }}
      </div>
    </td>
  </tr>
</template>

<script>
  import * as moment from 'moment';

  export default {
    name: 'ChatMessage',
    props: [
      'theMessage'
    ],
    methods: {
      GetTimeOfMessage() {
        if (this.theMessage.timeOfMessage !== undefined) {
          return moment(this.theMessage.timeOfMessage).format('dddd, YYYY-MM-DD HH-mm-ss.SSS');
        } else {
          return '';
        }
      },
      GetUser() {
        if (this.theMessage.user !== undefined) {
          return this.theMessage.user;
        } else {
          return '';
        }
      },
      GetMessage() {
        if (this.theMessage.text !== undefined) {
          return this.theMessage.text;
        } else {
          return '';
        }
      },
      GetClass() {
        if (this.theMessage.user === undefined) {
          return 'adminMessage'
        } else {
          return '';
        }
      }
    }
  }

</script>

<style>

  tr {
    vertical-align: top;
  }

  .adminMessage {
    color: gray;
  }

  .username {
    font-weight: bold;
  }

</style>
