<template>
  <div>
    <header id="header" class="white text-shadow">
      <div><img src="@/assets/img/yo.svg" alt="logo" /></div>
      <div><h3>¡Hola! me llamo Jesús y soy desarrollador Fullstack</h3></div>
      <m-icon name="chevron-double-down" size="xl" @click="handlePage(1)" />
    </header>
    <div id="description" :class="{ show: visibleDescription }">
      <m-icon name="chevron-double-up" size="xl" @click="handlePage(0)" />
      <div class="bg-dark">
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div><p>Terminal</p></div>
        </div>
        <h4>~$ {{ textShow }}{{ cursor }}</h4>
      </div>
      <m-icon name="chevron-double-down" size="xl" @click="handlePage(2)" />
    </div>
    <div id="skills" class="white text-shadow" :class="{ show: visibleSkills }">
      <m-icon name="chevron-double-up" size="xl" @click="handlePage(1)" />
      <div>
        <h4>Mís habilidades</h4>
        <br />
        <div>
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="mx-1 skill up-hover"
            :class="{ visible: skill.visible }"
          >
            <img :src="skill.img" :alt="skill.name" />
            <p>{{ skill.name }}</p>
            <small>{{ skill.score }}</small>
          </div>
        </div>
      </div>
      <m-icon name="chevron-double-down" size="xl" @click="handlePage(3)" />
    </div>
    <div id="projects" :class="{ show: visibleProjects }">
      <m-icon name="chevron-double-up" size="xl" @click="handlePage(2)" />
      <video autoplay muted loop>
        <source src="@/assets/video/proyectos.mp4" type="video/mp4" />
      </video>
      <div>
        <div class="white">
          <h4>Proyectos:</h4>
          <ul>
            <li>
              <a href="https://www.mayoralseguretat.com/"
                ><h5>mayoralseguretat.com</h5></a
              >
              <small
                >Sitio web desarrollado con Laravel y Angular, con un backoffice
                que permite gestionar los productos.</small
              >
            </li>
          </ul>
          <h4>Colaboraciones:</h4>
          <ul>
            <li>
              <a href="https://nopas.cesc-it.com/"
                ><h5>nopas.cesc-it.com</h5></a
              >
              <small
                >Aplicacion web de facturación desarrollada con Spring Boot,
                Quasar y PostgreSQL.</small
              >
            </li>
            <li>
              <a href="https://plataforma.cisle.es/"
                ><h5>plataforma.cisle.es</h5></a
              >
              <small
                >Aplicacion web para la gestión de subvenciones desarrollada con
                Spring Boot, Vuetify y MySQL.</small
              >
            </li>
          </ul>
        </div>
      </div>
      <m-icon name="chevron-double-down" size="xl" @click="handlePage(4)" />
    </div>
    <div id="contact" class="white" :class="{ show: visibleContact }">
      <m-icon name="chevron-double-up" size="xl" @click="handlePage(3)" />
      <div>
        <h6>Contacto:</h6>
        <form @submit.prevent="sendEmail()">
          <m-input v-model="message.name" label="Nombre" type="text" required />
          <m-input
            v-model="message.from"
            label="Email"
            type="email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <m-text-area
            v-model="message.text"
            label="Mensaje"
            type="text"
            required
          />
          <button class="btn white" type="submit">
            Enviar<span
              class="mdi mdi-send mx-1"
              style="font-size: 1.5em; vertical-align: middle"
            ></span>
          </button>
        </form>
        <div class="ma-1">
          <div
            class="skill up-hover visible"
            @click="
              goTo(
                'https://www.linkedin.com/in/jes%C3%BAs-s%C3%A1nchez-carbonero-96a856179'
              )
            "
          >
            <img src="@/assets/img/linkedin-icon-2.svg" alt="linkedin" />
            <p>LinkedIn</p>
          </div>
          <div
            class="skill up-hover visible"
            @click="goTo('https://www.instagram.com/jsancarb/')"
          >
            <img src="@/assets/img/instagram-2-1.svg" alt="Instagram" />
            <p>Instagram</p>
          </div>
          <div
            class="skill up-hover visible"
            @click="goTo('https://twitter.com/jsancarb')"
          >
            <img src="@/assets/img/twitter-6.svg" alt="Twitter" />
            <p>Twitter</p>
          </div>
        </div>
      </div>
    </div>
    <div id="modal" :class="{ 'visible-modal': !modal }">
      <div>
        <span @click="modal = false">x</span>
        <h4>{{ textoModal }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import mInput from "@/components/m-input.vue";
import MIcon from "@/components/m-icon.vue";
import MTextArea from "@/components/m-text-area.vue";

export default {
  components: { mInput, MIcon, MTextArea },
  setup() {
    const text =
      '"La tecnología me ha motivado siempre a evolucionar y poder reinventarme, el desarrollo web puedo decir que es mi pasión y ahora también mi oficio"';
    const charsText = text.split("");
    const textShow = ref("");
    const cursor = ref("|");
    const visibleDescription = ref(false);
    const visibleSkills = ref(false);
    const visibleProjects = ref(false);
    const visibleContact = ref(false);
    const modal = ref(false);
    const textoModal = ref("");
    const message = ref({
      name: null,
      from: null,
      text: null,
    });
    const skills = ref([
      {
        img: require("@/assets/img/spring-3.svg"),
        name: "Springboot",
        score: "🔸🔸🔸🔸🔹",
        visible: false,
      },
      {
        img: require("@/assets/img/java-4.svg"),
        name: "Java",
        score: "🔸🔸🔸🔸🔸",
        visible: false,
      },
      {
        img: require("@/assets/img/logo-javascript.svg"),
        name: "JavaScript",
        score: "🔸🔸🔸🔸🔹",
        visible: false,
      },
      {
        img: require("@/assets/img/typescript.svg"),
        name: "Typescript",
        score: "🔸🔸🔸🔹🔹",
        visible: false,
      },
      {
        img: require("@/assets/img/angular-icon.svg"),
        name: "Angular",
        score: "🔸🔸🔸🔹🔹",
        visible: false,
      },
      {
        img: require("@/assets/img/vue-9.svg"),
        name: "Vue",
        score: "🔸🔸🔸🔸🔸",
        visible: false,
      },
      {
        img: require("@/assets/img/nodejs-2.svg"),
        name: "NodeJS",
        score: "🔸🔸🔸🔸🔹",
        visible: false,
      },
      {
        img: require("@/assets/img/html-1.svg"),
        name: "Html5",
        score: "🔸🔸🔸🔸🔸",
        visible: false,
      },
      {
        img: require("@/assets/img/css-3.svg"),
        name: "Css3",
        score: "🔸🔸🔸🔸🔸",
        visible: false,
      },
      {
        img: require("@/assets/img/sass-1.svg"),
        name: "Sass",
        score: "🔸🔸🔸🔸🔹",
        visible: false,
      },
      {
        img: require("@/assets/img/php-1.svg"),
        name: "Php",
        score: "🔸🔸🔸🔸🔹",
        visible: false,
      },
      {
        img: require("@/assets/img/laravel-2.svg"),
        name: "Laravel",
        score: "🔸🔸🔸🔸🔹",
        visible: false,
      },
      {
        img: require("@/assets/img/tux.svg"),
        name: "Linux",
        score: "🔸🔸🔸🔸🔸",
        visible: false,
      },
      {
        img: require("@/assets/img/git.svg"),
        name: "Git",
        score: "🔸🔸🔸🔸🔹",
        visible: false,
      },
    ]);
    let lastY = null;
    let timer = true;
    let page = 0;
    let writing = false;
    onMounted(() => {
      document.addEventListener("wheel", handleWhell, { passive: false });
      document.addEventListener("touchmove", handleTouch, { passive: false });
      setInterval(() => {
        cursor.value ? (cursor.value = "") : (cursor.value = "|");
      }, 300);
    });
    function handleWhell(event) {
      event.preventDefault();
      if (timer) {
        timer = false;
        setTimeout(() => {
          timer = true;
        }, 300);
        if (event.wheelDeltaY < 0 && page < 4) {
          page++;
          handlePage(page);
        } else if (event.wheelDeltaY > 0 && page > 0) {
          page--;
          handlePage(page);
        }
      }
    }
    function handleTouch(event) {
      event.preventDefault();
      let nowY = event?.touches[0].clientY;
      if (timer && lastY) {
        timer = false;
        setTimeout(() => {
          timer = true;
        }, 500);
        if (nowY < lastY && page > 0) {
          page--;
          handlePage(page);
        } else if (nowY > lastY && page < 4) {
          page++;
          handlePage(page);
        }
      }
      lastY = nowY;
    }
    function handlePage(num) {
      switch (num) {
        case 0:
          visibleDescription.value = false;
          visibleSkills.value = false;
          break;
        case 1:
          visibleDescription.value = true;
          visibleSkills.value = false;
          handleWrite();
          break;
        case 2:
          visibleSkills.value = true;
          visibleProjects.value = false;
          handleSkills();
          break;
        case 3:
          visibleProjects.value = true;
          visibleContact.value = false;
          break;
        case 4:
          visibleContact.value = true;
          break;
      }
    }
    async function handleWrite() {
      if (!writing) {
        textShow.value = "";
        writing = true;
        for await (let char of charsText) {
          textShow.value += char;
          await new Promise((r) => setTimeout(r, 50));
        }
        writing = false;
      }
    }
    async function handleSkills() {
      for (let skill of skills.value) {
        skill.visible = false;
      }
      await new Promise((r) => setTimeout(r, 500));
      for await (let skill of skills.value) {
        skill.visible = true;
        await new Promise((r) => setTimeout(r, 100));
      }
    }
    function goTo(url) {
      window.location.href = url;
    }
    async function sendEmail() {
      let response = await axios.post(
        /* "http://localhost:5000/api/sendemail" */
        "https://my-api.alwaysdata.net/api/sendemail",
        message.value
      );
      if (response.data) {
        textoModal.value = "Mensaje enviado";
        modal.value = true;
      }
    }
    return {
      textShow,
      cursor,
      visibleDescription,
      visibleSkills,
      visibleProjects,
      visibleContact,
      skills,
      message,
      modal,
      textoModal,
      handlePage,
      goTo,
      sendEmail,
    };
  },
};
</script>

<style lang="scss">
body {
  overflow: hidden;
}
header {
  box-sizing: border-box;
  z-index: 0;
  background-image: url("@/assets/img/header-background.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  text-align: center;
  > :nth-child(1) {
    height: 50vh;
    padding: 5%;
    box-sizing: border-box;
    img {
      max-width: 50vw;
      max-height: 100%;
    }
  }
  > :nth-child(2) {
    height: 40vh;
    box-sizing: border-box;
    h3 {
      font-size: 10vh;
    }
  }
}
#description {
  background: rgb(63, 94, 251);
  background: linear-gradient(
    90deg,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 226, 1) 100%
  );
  top: 150%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  position: absolute;
  overflow: hidden;
  transition: top 0.5s ease-in-out;
  > div {
    box-sizing: border-box;
    color: rgb(35, 228, 35);
    font-size: 0.8em;
    border-radius: 5px;
    border-width: 25px 4px 4px 4px;
    border-color: rgb(223, 211, 211);
    border-style: solid;
    padding: 5%;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
    height: 50vh;
    max-width: 80vw;
    position: relative;
    > div {
      position: absolute;
      top: -25px;
      left: -4px;
      right: -4px;
      width: 100%;
      display: grid;
      gap: 10px;
      height: 25px;
      grid-template-columns: 15px 15px 15px 100%;
      align-items: center;
      justify-content: left;
      padding-left: 20px;
      div {
        height: 15px;
        width: 15x;
        border-radius: 100%;
      }
      :nth-child(1) {
        background-color: red;
      }
      :nth-child(2) {
        background-color: yellow;
      }
      :nth-child(3) {
        background-color: rgb(31, 197, 31);
      }
      :nth-child(4) {
        p {
          margin-left: -190px;
          text-align: center;
          color: black;
          font-weight: 700;
          background-color: transparent;
        }
      }
    }
  }
}
#skills {
  background: rgb(63, 251, 126);
  background: linear-gradient(
    90deg,
    rgb(63, 251, 126) 0%,
    rgb(109, 70, 252) 100%
  );
  top: 150%;
  left: 150%;
  right: 0;
  bottom: 0;
  z-index: 2;
  overflow: hidden;
  position: absolute;
  > div {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    div {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      justify-content: space-around;
    }
  }
  transition: top 0.5s linear, left 0.5s linear;
}
#projects {
  span {
    z-index: 4;
  }
  z-index: 3;
  top: 150%;
  left: 0;
  right: 150%;
  bottom: 0;
  overflow: hidden;
  position: absolute;
  transition: top 0.5s linear, right 0.5s linear;
  > video {
    object-fit: cover;
    object-position: center center;
    width: 100vw;
    height: 100vh;
  }
  > div {
    background-color: rgba(105, 25, 129, 0.24);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    > div {
      height: 50%;
      padding: 5%;
      position: absolute;
      bottom: 0;
      width: 90%;
      background: rgba(0, 0, 0, 0.8);
      li {
        margin-left: 3em;
      }
    }
  }
}
#contact {
  background: rgb(251, 101, 63);
  background: linear-gradient(
    90deg,
    rgb(251, 101, 63) 0%,
    rgb(70, 73, 252) 100%
  );
  top: 150%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  position: absolute;
  overflow: hidden;
  > div {
    div {
      margin-top: 3px;
    }
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-flow: column;
    height: 90%;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    > :nth-child(2) {
      text-align: center;
    }
    form {
      width: 100%;
      margin: auto;
      display: flex;
      flex-direction: column;
    }
    > :last-child {
      width: 100%;
      box-sizing: border-box;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: flex-end;
      img {
        width: 40px;
      }
    }
  }
  transition: top 0.5s linear;
}
.rounded {
  border-radius: 50%;
}
.skill {
  opacity: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 600;
  text-align: center;
  transition: all 0.5s;
  img {
    margin: auto;
    max-width: 100px;
    max-height: 100px;
  }
}
.up-hover {
  transition: all 0.3s;
  &:hover {
    transform: translateY(-4px);
  }
}
.show {
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  opacity: 1 !important;
}
.mdi-chevron-double-down {
  animation: chevron-down 2s infinite;
  position: absolute;
  bottom: 0.05em;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  color: white;
  height: 10vh;
  font-size: 8vh;
}
#modal {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 5;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.8);
  > div {
    position: absolute;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid grey;
    border-top: 25px solid grey;
    border-radius: 5px;
    width: 400px;
    height: 200px;
    padding: 10px;
    background-color: white;
    text-align: center;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
    > span {
      position: absolute;
      top: -27px;
      right: 5px;
      font-weight: 900;
      font-size: 20px;
    }
  }
  transition-delay: 0.3s;
  transition: opacity 0.3s ease-in-out;
}
.visible-modal {
  top:150vh !important;
  opacity: 0 !important;
  > div {
    width: 0px !important;
    height: 0px !important;
    h4 {
      display: none;
    }
  }
}

@keyframes chevron-down {
  0% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(0.1em);
  }
  100% {
    transform: translateY(0);
  }
}
.mdi-chevron-double-up {
  animation: chevron-up 2s infinite;
  position: absolute;
  top: 0.05em;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  color: white;
  height: 10vh;
  font-size: 8vh;
}
@keyframes chevron-up {
  0% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(0);
  }
  90% {
    transform: translateY(-0.1em);
  }
  100% {
    transform: translateY(0);
  }
}
.visible {
  opacity: 1;
}
@media (max-width: 900px) {
  header {
    > :nth-child(2) {
      h3 {
        font-size: 6vh;
      }
    }
  }
  #description {
    font-size: 0.7em;
    div {
      font-size: 0.5em;
    }
  }
  .skill {
    width: 70px;
    img {
      max-width: 50px;
      max-height: 50px;
    }
  }
  #skills {
    font-size: 0.7em;
    div {
      div {
        gap: 3px;
      }
    }
  }
  #projects {
    font-size: 0.7em;
    div {
      font-size: 0.8em;
      small {
        font-size: 1.4em;
      }
    }
  }
  #contact {
    font-size: 0.7em;
    > div {
      font-size: 1.5em;
      width: 90%;
      > div {
        font-size: 0.7em;
        > img {
          max-width: 100px;
        }
      }
    }
  }
}
</style>
