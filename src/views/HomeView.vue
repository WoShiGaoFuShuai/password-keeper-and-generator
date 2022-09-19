<template>
  <div class="home">
    <CreatePassMenu />
    <CardHolder />
  </div>
</template>

<script>
import CreatePassMenu from "@/components/CreatePassMenu.vue";
import CardHolder from "@/components/CardHolder.vue";

export default {
  name: "HomeView",
  components: { CreatePassMenu, CardHolder },
};
</script>
