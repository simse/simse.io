<template>
  <div>
    <BarEditor />
  </div>
</template>

<script>
import BarEditor from "@/components/BarEditor"

export default {
  name: 'Bar Maker',
  components: {
    BarEditor
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  background: #fcfeff;
}

h1 {
  text-align: center;
}
</style>
