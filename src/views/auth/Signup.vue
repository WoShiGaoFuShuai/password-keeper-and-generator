<template>
  <div class="signup">
    <div class="container">
      <form @submit.enter.prevent="handleSubmitSignup">
        <h2>Signup</h2>

        <input
          type="text"
          placeholder="Nickname"
          v-model="displayName"
          required
        />
        <input type="email" placeholder="Email" v-model="email" required />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <div class="error">{{ error }}</div>
        <button v-if="!isPending">Signup</button>
        <button v-if="isPending" disabled>Loading...</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useSignup from "@/composables/useSignup";
import { useRouter } from "vue-router";

export default {
  setup() {
    //COMPOSABLES
    const { error, isPending, signup } = useSignup();
    const router = useRouter();
    //REFS
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    //FUNCTIONS

    const handleSubmitSignup = async () => {
      await signup(email.value, password.value);
      if (!error.value) {
        router.push({ name: "Home" });
      }
      displayName.value = "";
      email.value = "";
      password.value = "";
    };

    return {
      displayName,
      email,
      password,
      handleSubmitSignup,
      isPending,
      error,
    };
  },
};
</script>

<style lang="scss" scoped>
form input {
  width: 90%;
}
</style>
