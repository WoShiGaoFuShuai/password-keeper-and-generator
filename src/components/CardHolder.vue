<template>
  <div class="card-holder">
    <div class="wrapper-card-containers" v-if="documents">
      <div class="no-passwords" v-if="!documents.length">
        <h3>You haven't saved any passwords yet!</h3>
      </div>
      <div
        class="card-container"
        @mouseleave.stop="handleMouseLeave"
        v-for="doc in documents"
        :key="doc.id"
      >
        <div class="card-item">
          <div class="front">
            <p class="website-text" @copy.prevent @paste.prevent>
              {{ doc.website }}
            </p>
          </div>

          <div
            :class="{
              back: true,
            }"
          >
            <p class="email-text" v-if="protectCopy" @copy.prevent>
              {{ doc.email }}
            </p>
            <p class="pass-text" v-if="protectCopy" @copy.prevent>
              {{ doc.password }}
            </p>
            <p class="email-text" v-if="!protectCopy">{{ doc.email }}</p>
            <p class="pass-text" v-if="!protectCopy">{{ doc.password }}</p>
          </div>
          <i
            :class="{
              'fa-regular': true,
              'fa-eye': true,
              'eye-img': true,
              'eye-show': eyeShow,
            }"
          ></i>

          <i
            @click="handleDelete(doc)"
            :class="{
              'fa-solid': true,
              'fa-circle-minus': true,
              'del-img': true,
            }"
          ></i>

          <i
            @click.stop="checkFunc"
            :class="{
              'fa-regular': true,
              'fa-eye-slash': true,
              'eye-img': true,
              'eye-show': !eyeShow,
            }"
          ></i>
        </div>
      </div>
    </div>
    <div class="no-data" v-if="!documents">
      <h3>Documents are loading...</h3>
    </div>
  </div>
  <GeneratePassword />
</template>

<script>
import getCollection from "@/composables/getCollection";
import { ref } from "vue";
import getUser from "@/composables/getUser";
import GeneratePassword from "@/components/GeneratePassword.vue";
import useCollection from "@/composables/useCollection";

export default {
  components: {
    GeneratePassword,
  },
  setup() {
    //COMPOSABLES
    const { user } = getUser();
    const { documents } = getCollection("allUsersData", [
      "userId",
      "==",
      user.value.uid,
    ]);
    const { delDocument } = useCollection("allUsersData");

    //REFS
    // const showBlur = ref(true);
    const eyeShow = ref(false);
    const protectCopy = ref(true);

    //FUNCTIONS
    const handleMouseLeave = (e) => {
      let a = e.currentTarget.querySelector(".back");
      a.classList.remove("not-blured");

      eyeShow.value = false;
      protectCopy.value = true;
    };

    const checkFunc = (e) => {
      let backSide = e.currentTarget.parentNode.querySelector(".back");
      backSide.classList.add("not-blured");
      eyeShow.value = true;
      protectCopy.value = false;
    };

    const handleDelete = (doc) => {
      delDocument(doc);
    };

    return {
      documents,
      handleMouseLeave,
      checkFunc,
      eyeShow,
      protectCopy,
      handleDelete,
    };
  },
};
</script>

<style lang="scss" scoped>
.eye-img {
  position: absolute;
  top: 6px;
  right: 6px;
  font-size: 25px;
  opacity: 0;
  transition: all 1.5s ease;
}

.del-img {
  position: absolute;
  top: 6px;
  left: 6px;
  font-size: 25px;
  opacity: 0;
  transition: all 1.5s ease;
}
.check1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.card-holder {
  .wrapper-card-containers {
    margin-left: 380px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media (max-width: 800px) {
      margin-left: 0;
    }
  }

  .card-container {
    margin: 10px 15px;
  }

  .card-item {
    position: relative;
    width: 150px;
    height: 150px;
    //  background-color: #e9c46a;
    box-shadow: 2px 3px 3px 4px rgba(244, 162, 97, 0.2);
    cursor: pointer;
    transition: all 0.5s ease-in;
    position: relative;
    perspective: 1000px;
    border-radius: 10px 0 10px 0;

    &:hover {
      box-shadow: 2px 3px 3px 4px rgba(44, 62, 80, 0.2);
      transform: scale(1.02);
      border-radius: 0 10px 0 10px;
    }

    &:hover .front {
      transform: rotateY(180deg);
    }
    &:hover .back {
      transform: rotateY(360deg);
    }

    &:hover .eye-show {
      opacity: 1;
    }

    &:hover .del-img {
      opacity: 1;
    }

    .front,
    .back,
    .not-blured {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 10px;
      overflow: auto;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      backface-visibility: hidden;
      transition: 1s;
    }

    .back {
      flex-direction: column;
      justify-content: center;
      display: inline-block;

      transform: rotateY(180deg);
      filter: blur(3px);
    }

    .not-blured {
      flex-direction: column;
      filter: blur(0px);
    }

    .website-text {
      width: 100%;
      font-size: 24px;
      font-weight: 700;
      color: #2a9d8f;
      text-transform: uppercase;
      word-wrap: break-word;

      text-shadow: 1px 2px 1px rgba(244, 162, 97, 0.5);
    }

    .email-text,
    .pass-text {
      width: 100%;
      font-size: 16px;
      word-wrap: break-word;
      font-weight: 700;
      color: #e76f51;
      margin: 32px 0 16px 0;
      text-shadow: 1px 2px 1px rgba(244, 162, 97, 0.5);
    }

    .pass-text {
      margin-top: 0;
      color: #2a9d8f;
    }
  }
  .no-data {
    h3 {
      text-align: center;
      padding: 100px 0 0 380px;
      font-size: 30px;
      color: #264653;
    }
  }
}
</style>
