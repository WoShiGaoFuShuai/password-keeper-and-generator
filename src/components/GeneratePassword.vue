<template>
  <div class="wrapper">
    <button class="toggleButton" @click="togglePasswordGeneratorButton">
      Password Generator
    </button>
    <form v-if="showPassGenerator" @submit.enter.prevent="handleSubmit">
      <h3>Password Generator</h3>
      <div class="result-wrapper">
        <input v-model="result" type="text" />
        <i
          v-if="!copied"
          @click="handleClick"
          class="fa-solid fa-clipboard"
        ></i>
        <i v-if="copied" class="fa-solid fa-clipboard-check"></i>
      </div>

      <div class="options">
        <label>
          <span>Password length: {{ passLength }}</span>
          <input type="range" v-model="passLength" min="1" max="30" />
        </label>

        <div class="checkboxes">
          <label>
            <span>Uppercase letters</span>
            <input v-model="uppers" type="checkbox" />
          </label>

          <label>
            <span>Lowercase letters</span>
            <input v-model="lowers" type="checkbox" />
          </label>

          <label>
            <span>Numbers</span>
            <input v-model="numbers" type="checkbox" />
          </label>

          <label>
            <span>Symbols</span>
            <input v-model="symbols" type="checkbox" />
          </label>
        </div>
      </div>

      <button>Generate password</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import refGeneratePassword from "@/composables/generatePassword";
export default {
  setup() {
    //COMPOSABLES
    const { generatePassword } = refGeneratePassword(); // FIX!

    //REFS
    const result = ref(null);
    const passLength = ref("15");
    const uppers = ref(false);
    const lowers = ref(false);
    const numbers = ref(false);
    const symbols = ref(false);

    const showPassGenerator = ref(false);
    const copied = ref(false);

    //FUNCTIONS
    function handleSubmit() {
      result.value = generatePassword(
        uppers.value,
        lowers.value,
        numbers.value,
        symbols.value,
        +passLength.value
      );
    }

    const handleClick = async () => {
      await navigator.clipboard.writeText(result.value);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 1000);
    };

    const togglePasswordGeneratorButton = () => {
      showPassGenerator.value = !showPassGenerator.value;
      result.value = "";
    };

    return {
      result,
      passLength,
      uppers,
      lowers,
      numbers,
      symbols,
      handleSubmit,
      handleClick,
      showPassGenerator,
      copied,
      togglePasswordGeneratorButton,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-left: 380px;

  @media (max-width: 960px) {
    margin-left: 0;
  }
}

form {
  color: #f4a261;
  padding: 30px 0;
  max-width: 600px;
  margin: 20px auto;
  width: 94%;

  input {
    max-width: 90%;
  }

  .result-wrapper {
    position: relative;
    width: inherit;

    input {
      width: 90%;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-all;
      text-align: justify;

      @media (max-width: 530px) {
        padding-right: 43px;
        padding-top: 38px;
      }
    }

    i {
      position: absolute;
      top: 24px;
      right: 40px;
      font-size: 30px;
      color: #264653;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }

      @media (max-width: 425px) {
        top: 27px;
        right: 26px;
        font-size: 26px;
      }
    }
  }

  .options {
    display: flex;
    flex-direction: column;
    width: 90%;

    .checkboxes {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;

      label {
        display: flex;
        justify-content: space-between;
        max-width: 250px;
        width: 100%;
        margin: 10px;

        input {
          width: 20px;
          margin: 0;
          padding: 10px;
        }
      }
    }
  }
}

.toggleButton {
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

  @media (max-width: 960px) {
    margin-left: 380px;
  }

  @media (max-width: 800px) {
    margin-left: 0;
  }
}
</style>
