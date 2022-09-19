<template>
  <div class="nav">
    <div class="container">
      <nav v-if="isShowNavigation" :class="{ active: active }">
        <div class="user-wrapper" v-if="user">
          <span>Current user: {{ user.email }}</span>
          <button class="btn" @click="handleLogoutUser">Logout</button>
        </div>
        <div v-if="!user" :class="{ active: active }">
          <router-link class="rl" :to="{ name: 'Login' }">Login</router-link>
          <router-link class="rl" :to="{ name: 'Signup' }">Sign up</router-link>
        </div>
      </nav>
    </div>
    <div class="hamburger" :class="{ active: active }" @click="showNav">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import useLogout from "@/composables/useLogout";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

export default {
  setup() {
    //HOOKS
    onMounted(() => {
      if (window.innerWidth) {
        isShowNavigation.value = false;
      }
      window.addEventListener("resize", resizeCheck);
    });

    //COMPOSABLES
    const { user } = getUser();
    const { logout } = useLogout();
    const router = useRouter();

    //REFS
    const active = ref(false);
    const isShowNavigation = ref(true);

    //FUNCTIONS
    const handleLogoutUser = async () => {
      await logout();
      if (!user.value) {
        router.push({ name: "Login" });
      }
    };

    const showNav = () => {
      active.value = !active.value;
      isShowNavigation.value = !isShowNavigation.value;
    };

    const resizeCheck = (e) => {
      let width = e.target.innerWidth;
      if (width <= 800) {
        isShowNavigation.value = false;
        return;
      } else {
        isShowNavigation.value = true;
        document.querySelector(".hamburger").classList.remove("active");
      }
    };

    return {
      user,
      handleLogoutUser,
      showNav,
      active,
      isShowNavigation,
      resizeCheck,
    };
  },
};
</script>

<style lang="scss" scoped>
.nav {
  background-color: #264653;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 800px) {
    justify-content: initial;
  }

  .container {
    margin: 0 20px;
  }

  .user-wrapper {
    width: 100%;
    max-width: 600px;
    min-width: 374px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.5s ease;

    @media (max-width: 800px) {
      flex-direction: column;
      align-items: flex-start;
    }

    .btn {
      margin: 0;

      @media (max-width: 800px) {
        margin: 10px 0;
      }
    }
  }

  span {
    color: #f4a261;
    font-weight: 700;

    @media (max-width: 800px) {
      margin-top: 5px;
    }
  }

  .hamburger {
    display: none;
    cursor: pointer;
    margin-right: 20px;

    @media (max-width: 800px) {
      display: block;
      position: absolute;
      top: 24px;
      right: 6px;
    }

    .bar {
      display: block;
      width: 25px;
      height: 3px;
      margin: 5px auto;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      background: #f4a261;
    }
  }
}

@media (max-width: 800px) {
  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  // nav {
  //   position: fixed;
  //   left: -100%;
  //   top: 20px;
  //   gap: 0;
  //   transition: 0.3s;
  // }

  nav.active {
    left: initial;
    // right: 60px;
  }
}
</style>
