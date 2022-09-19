<template>
  <div class="login">
    <div class="container">
      <form @submit.enter.prevent="handleSubmitLogin">
        <h2>Login</h2>
        <input type="email" placeholder="Email" v-model="email" required />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <div class="error">{{ error }}</div>
        <button v-if="!isPending">Login</button>
        <button v-if="isPending" disabled>Loading...</button>
      </form>
    </div>
  </div>
</template>

<script>
import useLogin from "@/composables/useLogin";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  setup() {
    //COMPOSABLES
    const { error, isPending, login } = useLogin();
    const router = useRouter();

    //REFS
    const email = ref("");
    const password = ref("");

    //FUNCTIONS

    const handleSubmitLogin = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        router.push({ name: "Home" });
      }

      email.value = "";
      password.value = "";
    };

    return { email, password, error, isPending, handleSubmitLogin };
  },
};
</script>

<style lang="scss" scoped>
form input {
  width: 90%;
}
</style>
