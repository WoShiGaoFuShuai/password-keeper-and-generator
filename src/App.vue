<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: { Navbar },
  setup() {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.rl {
  display: inline-block;
  padding: 10px;
  color: #e9c46a;
  text-decoration: none;
}

form {
  background-color: #264653;
  border-radius: 16px;
  max-width: 700px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  box-shadow: 2px 2px 2px 2px rgba(233, 196, 106, 0.5);
  transition: all 0.3s linear;

  &:hover {
    transform: scale(1.01);
    box-shadow: 2px 2px 2px 2px rgba(42, 157, 143, 0.5);
  }

  h2 {
    margin-top: 30px;
    color: #e9c46a;
    transition: all 0.3s linear;

    &:hover {
      color: #2a9d8f;
    }
  }

  input {
    width: 600px;
    margin: 20px 0;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 16px;
    background-color: #e9c46a;
    color: white;
    font-size: 18px;
    transition: all 0.3s linear;

    &:hover {
      transform: scale(1.01);
    }
  }

  .error {
    color: #e76f51;
  }
}
button,
.btn {
  background-color: #e9c46a;
  color: white;
  border-radius: 16px;
  padding: 10px 15px;
  margin: 20px 0;
  cursor: pointer;
  transition: all 0.3s linear;
  border: none;
  outline: none;

  &:hover {
    background-color: #2a9d8f;
    color: #e9c46a;
  }
}
</style>
