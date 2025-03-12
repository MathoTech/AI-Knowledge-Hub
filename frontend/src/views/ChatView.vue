<script setup>
import QuestionForm from "@/components/QuestionForm.vue";
</script>

<template>
  <header>
    Ask Anything..
  </header>

  <main>
    <QuestionForm/>
  </main>

  
</template>

<style scoped>

header {
    text-align: center;
    padding-top: 48px;
}
main {
    display: flex;
    justify-content: center;
    padding-top: 24px;
}

</style>
