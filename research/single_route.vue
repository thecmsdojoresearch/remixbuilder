<script type = "server">
const fs = require('fs');
</script>
<script type="client">
export default {
  store: {
    state: {
      counter: 0
    }
  }
}
</script>
<template>
  <h1>{store.state}</h1>
</template>
