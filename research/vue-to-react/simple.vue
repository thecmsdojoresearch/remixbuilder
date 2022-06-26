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
const page = {
  state: {
    counter: 0,
    a: {
      b: {
        c: {
          numbers: []
        }
      }
    }
  },
  incrementCounter(){
    this.state.counter += 1;
  },
  decrementCounter() {
    this.state.counter -= 1;
  },
  addNumber() {
    this.state.a.b.c.numbers.push(5);
  },
  onMounted() {
    console.log("mounted...");
  },
}
</script>

<template>
  <ul @if="page.state.counter > 0">
    <li @for="let i=0; i<3; i++">{i}</li>
  </ul>
  <button @click="page.incrementCounter()">
  </button>
</template>
