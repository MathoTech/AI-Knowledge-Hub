<script setup lang="ts">
import { ref } from "vue";
import { marked } from 'marked';


type Message = {
  text: string;
  sender: "client" | "other";
};

const message = ref<string>("");
const messages = ref<Message[]>([]);

// @ts-ignore
const sendMessage = async (): Promise<void> => {
  if (message.value.trim() !== '') {
    messages.value.push({ text: message.value, sender: 'client' });

    try {
      const response = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: message.value }),
      });

      if (!response.ok) {
        throw new Error('Error with the response');
      }

      const data = await response.json();
      messages.value.push({ text: data.answer, sender: 'other' });

    } catch (error) {
      console.error('Error sending message:', error);
      messages.value.push({ text: 'Failed to get a response.', sender: 'other' });
    }

    message.value = '';
  }
};

const renderMarkdown = (text: string) => {
  return marked(text);
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
      <div v-html="renderMarkdown(msg.text)"></div>

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

.message {
  margin: 8px !important;
  max-width: 70%;
  padding: 8px;
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
  font-family: "Kode Mono";
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
  font-family: "Kode Mono";
  width: 10%;
  background-color: #00adb5;
  border: none;
  border-radius: 5px;
  color: #eeeeee;
  cursor: pointer;
}

.input-container button:active {
  border: 1px solid white;
  outline: none;
}
.message p {
  margin: 0px !important;
  padding:0px !important;
}
</style>
