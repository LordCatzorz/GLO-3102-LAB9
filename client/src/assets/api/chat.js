import io from 'socket.io-client'
import * as constantes from '@/assets/Constantes'
import events from '@/assets/api/chatEvents'

let socket;

const userConnectListener = [];
const userDisconnectListener = [];
const messageReceivedListener = [];



function NotifyUserConnect(numberOfConnections) {
  userConnectListener.forEach((callback) => {
    if (typeof callback === 'function') {
      callback(numberOfConnections);
    }
  });
}

function NotifyUserDisconnect(numberOfConnections) {
  userDisconnectListener.forEach((callback) => {
    if (typeof callback === 'function') {
      callback(numberOfConnections);
    }
  });
}

function NotifyMessageReceived(user, message) {
  messageReceivedListener.forEach((callback) => {
    if (typeof callback === 'function') {
      callback(user, message);
    }
  });
}



export function ConnectToChatroom() {
  socket = io(constantes.API_ADDRESS);

  socket.on(events.OnUserConnect, (numberOfConnections) => {
    NotifyUserConnect(numberOfConnections);
  });

  socket.on(events.OnUserDisconnect, (numberOfConnections) => {
    NotifyUserDisconnect(numberOfConnections);
  });

  socket.on(events.OnMessageReceived, (user, message) => {
    NotifyMessageReceived(user, message);
  });
}

export function DisconnectFromChatroom() {
  socket.close();
}

export function SendMessage(user, message) {
  socket.emit(events.SendMessage, user, message)
}

export function AddUserConnectListener(callback) {
  if (typeof callback === 'function') {
    userConnectListener.push(callback);
  } else {
    console.log('AddUserConnectListener needs a callback function');
  }
}

export function AddUserDisconnectListener(callback) {
  if (typeof callback === 'function') {
    userDisconnectListener.push(callback);
  } else {
    console.log('AddUserDisconnectListener needs a callback function');
  }
}


export function AddMessageReceivedListener(callback) {
  if (typeof callback === 'function') {
    messageReceivedListener.push(callback);
  } else {
    console.log('AddMessageReceivedListener needs a callback function');
  }
}
