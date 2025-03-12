<script setup lang="ts">
import { ref } from 'vue';

type Message = {
  text: string;
  sender: 'client' | 'other';
};

const message = ref<string>('');
const messages = ref<Message[]>([]);

const sendMessage = (): void => {
  if (message.value.trim() !== '') {
    messages.value.push({ text: message.value, sender: 'client' });

    setTimeout(() => {
      messages.value.push({ text: "This is an answer.", sender: 'other' });
    }, 1000);

    message.value = '';
  }
};
</script>


<template>
  <div class="chat-container">
    <div class="messages-container">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['message', msg.sender]"
      >
        {{ msg.text }}
      </div>
    </div>

    <div class="input-container">
      <input
        v-model="message"
        placeholder="Write your message..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  background-color: #202020;
  width: 90%;
  height: 600px;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Styles des messages */
.message {
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word;
}

.client {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
}

.other {
  align-self: flex-start;
  background-color: #444;
  color: #eeeeee;
}

.input-container {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  display: flex;
  height: 40px;
  padding: 5px;
  box-sizing: border-box;
}

.input-container input {
  font-family: 'Kode Mono';
  width: 90%;
  background-color: #282828;
  color: #eeeeee;
  border: none;
  padding: 5px;
  border-radius: 5px;
}

.input-container input:focus {
  border: none;
  outline: none;
}

.input-container button {
  font-family: 'Kode Mono';
  width: 10%;
  background-color: #00ADB5;
  border: none;
  border-radius: 5px;
  color: #eeeeee;
  cursor: pointer;
}

.input-container button:active {
  border: 1px solid white;
  outline: none;
}
</style>
