<template>
  <div id="app">
    <div class="title">
      <img src="./assets/todopic.jpg" alt="ToDo Picture">
      <p class="title-text">Мои заметки и мероприятия</p>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title-text {
  font-size: 20px;
  font-weight: bold;
}

</style>
