<template>
  <div id="app">
    <header>
      <span>{{ appName }}</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      Proudly brought to you by <a href="https://aiwebstudio.com" target="_blank">Active Improvement Web Studio</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      appName: 'notes2go'
    }
  }
}
</script>

<style lang="scss">
$main-bg-color: #f0f0f0;
$header-bg-color: darkblue;
$footer-bg-color: lightblue;


html {
  height: 100%;
}

body {
  background-color: $main-bg-color;
  font-family: 'verdana';
  text-rendering: optimizeLegibility;
  padding: 0px;
  margin: 0px;
}

button:hover {
  cursor: pointer;
}

header {
  background-color: $header-bg-color;
  padding: 5px;
  color: white;
}

footer {
  background-color: $footer-bg-color;
  position: fixed;
  width: 100%;
  text-align: center;
  bottom: 0px;
  padding: 5px 0px;
}

a:hover {
  text-decoration: none;
}
</style>
