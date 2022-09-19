<template>
  <div class="createPassMenu">
    <div :class="['container', 'create-pass', { show: showLeftBar }]">
      <form @submit.enter.prevent="handleSubmitCreateCard">
        <input type="text" placeholder="Website" v-model="website" required />
        <input type="email" placeholder="Email" v-model="email" required />
        <input
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
        <div class="error">{{ error }}</div>
        <button v-if="!isPending">Save</button>
        <button v-if="isPending" disabled>Sending...</button>
      </form>
      <div class="container-toggler" @click="toggleLeftBar">
        <div class="container-toggler-relative">
          <i class="fa-solid fa-caret-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getUser from "@/composables/getUser";
import useCollection from "@/composables/useCollection";

export default {
  setup() {
    //COMPOSABLES
    const { user } = getUser();
    const { addDocument, error, isPending } = useCollection("allUsersData");

    //REFS
    const website = ref("");
    const email = ref("");
    const password = ref("");
    const showLeftBar = ref(false);

    //FUNC
    const handleSubmitCreateCard = async () => {
      await addDocument({
        email: email.value,
        password: password.value,
        website: website.value,
        userId: user.value.uid,
      });

      website.value = "";
      email.value = "";
      password.value = "";
    };

    const toggleLeftBar = () => {
      showLeftBar.value = !showLeftBar.value;
    };

    return {
      website,
      email,
      password,
      handleSubmitCreateCard,
      error,
      isPending,
      toggleLeftBar,
      showLeftBar,
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 380px;
  height: 100%;
  background-color: #264653;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 480px;
  transition: transform 0.5s ease-in-out;

  @media (max-width: 1024px) {
    height: initial;
    padding-top: 80px;
  }

  @media (max-width: 800px) {
    transform: translateX(-380px);
    z-index: 999;
  }

  @media (max-width: 425px) {
    transform: translateX(-291px);

    width: 290px;
  }

  &.create-pass.show {
    transform: translateX(0px);

    @media (max-width: 425px) {
      width: 290px;
    }
  }

  .container-toggler {
    opacity: 0;
    width: 16px;
    height: 40px;
    position: absolute;
    left: -50px;
    background-color: #264653;
    transition: left 1s ease-in;
    border-radius: 0px 15px 15px 0px;
    box-shadow: 1px 1px 2px 1px rgba(233, 196, 106, 0.5);
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }

    @media (max-width: 800px) {
      opacity: 1;
      margin-left: 0;
      left: 100%;
    }

    .container-toggler-relative {
      position: relative;
      width: inherit;
      height: inherit;

      i {
        color: #e9c46a;
        position: absolute;
        top: 50%;
        left: 42%;
        transform: translate(-50%, -50%);
      }
    }
  }

  form {
    max-width: 250px;

    input {
      width: 80%;
    }
  }
}
</style>
