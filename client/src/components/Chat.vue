<template>
  <div>
    <div>
      <span>Number people in this chat: {{ this.numberOfConnections }}</span>
    </div>
    <div>
      <message-sender></message-sender>
    </div>

  </div>
</template>

<script>
  import ChatMessage from '@/components/ChatMessage';
  import MessageSender from '@/components/MessageSender';
  import {ConnectToChatroom, DisconnectFromChatroom, AddUserConnectListener, AddUserDisconnectListener, AddMessageReceivedListener} from '@/assets/api/chat';
  import * as constantes from '@/assets/Constantes';

  export default {
    name: 'Chat',
    components: {
      'message-sender': MessageSender
    },
    data() {
      return {
        messages: [],
        numberOfConnections: 0
      }
    },
    methods: {
      OnUserConnection(newNumberOfConnections) {
        const newMessage = {
          timeOfMessage: Date.now(),
          text: constantes.NEW_CONNECTION_TEXT
        };
        this.numberOfConnections = newNumberOfConnections;

        this.messages.push(newMessage);
      },
      OnUserDisconnection(newNumberOfConnections) {
        const newMessage = {
          timeOfMessage: Date.now(),
          text: constantes.USER_QUIT_CHAT_TEXT
        };
        this.numberOfConnections = newNumberOfConnections;

        this.messages.push(newMessage);
      },
      OnMessageReception(user, message) {
        const newMessage = {
          timeOfMessage: Date.now(),
          text: message,
          user: user
        };

        this.messages.push(newMessage);
      },

    },
    beforeMount() {
      ConnectToChatroom();
      AddUserConnectListener(this.OnUserConnection);
      AddUserDisconnectListener(this.OnUserDisconnection);
      AddMessageReceivedListener(this.OnMessageReception)
    },
    beforeDestroy() {
      DisconnectFromChatroom();
    }
  }
</script>

<style>

</style>
