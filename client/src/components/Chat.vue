<template>
  <div>
    <div>
      <span>Number people in this chat: {{ this.numberOfConnections }}</span>
    </div>
    <div>
      <message-sender></message-sender>
    </div>
    <div>
      <table>
        <chat-message v-for="aMessage in this.orderedMessage" :key="aMessage.id" :theMessage="aMessage" ></chat-message>
      </table>

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
      'message-sender': MessageSender,
      'chat-message': ChatMessage
    },
    computed: {
      orderedMessage() {
        return this.messages.sort((a,b) => {
            if (a.timeOfMessage < b.timeOfMessage) {
              return 1
            }

            if (a.timeOfMessage > b.timeOfMessage) {
              return -1
            }
            //date equals
            if (a.id < b.id) {
              return 1
            }

            if (a.id > b.id) {
              return  -1
            }

            return 0;
        });
      }
    },
    data() {
      return {
        messages: [],
        numberOfConnections: 0,
        numberOfMessages: 0
      }
    },
    methods: {
      AddMessage(newMessage) {
        this.numberOfMessages += 1;
        newMessage.id = this.numberOfMessages;
        this.messages.push(newMessage);
      },
      OnUserConnection(newNumberOfConnections) {
        const newMessage = {
          timeOfMessage: Date.now(),
          text: constantes.NEW_CONNECTION_TEXT
        };
        this.numberOfConnections = newNumberOfConnections;
        this.AddMessage(newMessage);
      },
      OnUserDisconnection(newNumberOfConnections) {
        const newMessage = {
          timeOfMessage: Date.now(),
          text: constantes.USER_QUIT_CHAT_TEXT
        };
        this.numberOfConnections = newNumberOfConnections;
        this.AddMessage(newMessage);
      },
      OnMessageReception(user, message) {
        const newMessage = {
          timeOfMessage: Date.now(),
          text: message,
          user: user
        };
        this.AddMessage(newMessage);
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
