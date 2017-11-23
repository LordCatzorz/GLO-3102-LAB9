<template>
  <div>
    <div>
      <span>Name:</span>
      <input ref="nameInput" v-model="username" v-on:keyup="InputKeyPressed"/>
    </div>
    <div>
      <span>Message:</span>
      <input ref="messageInput" v-model="message" v-on:keyup="InputKeyPressed"/>
    </div>
    <div>
      <input type="button" value="Send" v-on:click="ExecuteSend" />
    </div>

  </div>

</template>

<script>
  import { SendMessage } from '@/assets/api/chat';

  export default {
    name: 'MessageSender',
    data() {
      return {
        username: '',
        message: ''
      }
    },
    methods: {
      ClearError() {
        this.$refs.nameInput.classList.remove('invalid');
        this.$refs.messageInput.classList.remove('invalid');

      },
      ValidateSend() {
        let valid = true;
        this.ClearError();
        if (this.username === '') {
          valid = false;
          this.$refs.nameInput.classList.add('invalid');
        }


        if (this.message === '') {
          valid = false;
          this.$refs.messageInput.classList.add('invalid');
        }

        return valid;
      },
      ExecuteSend() {
        if (this.ValidateSend()) {
          SendMessage(this.username, this.message);
          this.message = '';
        }
      },
      InputKeyPressed(event) {
        this.ClearError();
        if (event.key === "Enter") {
          this.ExecuteSend();
        }
      }
    }
  }

</script>

<style scoped>
  input.invalid {
    border-color: red;
  }

</style>
