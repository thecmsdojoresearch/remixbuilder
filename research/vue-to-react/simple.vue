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
  data() {
    return {
    }
  },
  method: {
  }
</script>

<template>
  <ul>
    <li v-for="i=0; i<3; i++">{i}</li>
  </ul>
</template>
