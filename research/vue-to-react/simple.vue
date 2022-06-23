<script from="server">
export default {
  loader() {
    return {
      a: 1,
      b: 2
    }
  },
  action() {
  }
}
</script>

<script from="client">
export default {
  data: {
    counter: 0
  },
  methods: {
    incrementCounter() {
      this.counterSet(this.counter + 1);
    }
  },
  mounted() {

  }
}
</script>

<template>
  <ul v-if="counter > 0">
    <li v-for="let i=0; i<3; i++">{{ i }}</li>
  </ul>
</template>
