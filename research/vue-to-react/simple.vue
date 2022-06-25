<!--
  after each click event handler is called, we sync the entire state immediately
-->
<script from="server">
const server = {
  onGET() {
    return {
    }
  },
  onPOST() {
  },
}
</script>

<script from="client">
const client = {
  state: {
    counter: 0,
    info: {
      a: {
        b: {
          c: 1,
          numbers: []
        }
      }
    }
  },
  incrementCounter() {
    this.state.counter++;
  },
  onMounted() {
  },
}
</script>

<template>
  <div @if=""></div>
  <ul @if="state.counter > 0">
    <li @for="let i=0; i<3; i++">{i}</li>
  </ul>
  <button @click="incrementCounter()">
  </button>
</template>
