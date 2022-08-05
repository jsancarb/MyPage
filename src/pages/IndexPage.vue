<template>
  <div class="container">
    <header id="header" class="white text-shadow">
      <img src="@/assets/img/yo.svg" alt="logo" class="pa-2" />
      <h3>¡Hola! me llamo Jesús y soy desarrollador Fullstack</h3>
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
        <div class="white text-shadow">
          <h4>Proyectos:</h4>
          <h5>mayoralseguretat.com</h5>
          <h5>nopas.cesc-it.com</h5>
          <h5>plataforma.cisle.es</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  setup() {
    const text =
      '"La tecnología me ha motivado siempre a evolucionar y poder reinventarme, el desarrollo web puedo decir que es mi pasión y ahora también mi oficio"';
    const charsText = text.split("");
    const textShow = ref("");
    const cursor = ref("|");
    const visibleDescription = ref(false);
    const visibleSkills = ref(false);
    const visibleProjects = ref(false);
    const skills = ref([
      {
        img: require("@/assets/img/spring-3.svg"),
        name: "Springboot",
        visible: false,
      },
      { img: require("@/assets/img/java-4.svg"), name: "Java", visible: false },
      {
        img: require("@/assets/img/logo-javascript.svg"),
        name: "JavaScript",
        visible: false,
      },
      {
        img: require("@/assets/img/typescript.svg"),
        name: "Typescript",
        visible: false,
      },
      {
        img: require("@/assets/img/angular-icon.svg"),
        name: "Angular",
        visible: false,
      },
      { img: require("@/assets/img/vue-9.svg"), name: "Vue", visible: false },
      {
        img: require("@/assets/img/nodejs-2.svg"),
        name: "NodeJS",
        visible: false,
      },
      {
        img: require("@/assets/img/html-1.svg"),
        name: "Html5",
        visible: false,
      },
      { img: require("@/assets/img/css-3.svg"), name: "Css3", visible: false },
      { img: require("@/assets/img/sass-1.svg"), name: "Sass", visible: false },
      { img: require("@/assets/img/php-1.svg"), name: "Php", visible: false },
      {
        img: require("@/assets/img/laravel-2.svg"),
        name: "Laravel",
        visible: false,
      },
      { img: require("@/assets/img/tux.svg"), name: "Linux", visible: false },
      { img: require("@/assets/img/git.svg"), name: "Git", visible: false },
    ]);
    let lastY = null;
    let timer = true;
    let page = 0;
    let rep = 0;
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
        if (event.wheelDeltaY < 0 && page < 3) {
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
      rep++;
      let nowY = event?.touches[0].clientY;
      if (nowY < lastY && page < 3 && rep > 8) {
        page++;
        handlePage(page);
        rep = 0;
      } else if (nowY > lastY && page > 0 && rep > 8) {
        page--;
        handlePage(page);
        rep = 0;
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
    return {
      textShow,
      cursor,
      visibleDescription,
      visibleSkills,
      visibleProjects,
      skills,
      handlePage,
    };
  },
};
</script>

<style lang="scss">
body {
  overflow: hidden;
}
header {
  z-index: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-image: url("@/assets/img/header-background.jpg");
  background-position: center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  text-align: center;
  h3 {
    padding-bottom: 2em;
  }
  img {
    margin: auto;
    max-width: 20%;
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
  opacity: 0;
  position: absolute;
  transition: all 0.5s ease-in-out;
  > div {
    color: rgb(35, 228, 35);
    font-size: 0.8em;
    border-radius: 5px;
    border-width: 25px 4px 4px 4px;
    border-color: rgb(223, 211, 211);
    border-style: solid;
    padding: 10% 5% 5% 5%;
    margin: auto;
    top: 50%;
    transform: translateY(-50%);
    min-height: 40vh;
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
  background: rgb(63, 94, 251);
  background: linear-gradient(
    90deg,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 226, 1) 100%
  );
  top: 150%;
  left: 150%;
  right: 0;
  bottom: 0;
  z-index: 2;
  position: absolute;
  > div {
    position: absolute;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    div {
      display: grid;
      gap: 5%;
      grid-template-columns: repeat(auto-fit, minmax(8em, 1fr));
      justify-content: center;
      align-items: center;
    }
  }
  transition: all 0.5s ease-in-out;
}
#projects {
  z-index: 3;
  top: 150%;
  left: 0;
  right: 150%;
  bottom: 0;
  position: absolute;
  transition: all 0.5s ease-in-out;
  > video {
    object-fit: cover;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  > div {
    background-color: rgba(105, 25, 129, 0.432);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    > div {
      padding: 3em;
      position: absolute;
      bottom: 0;
      width: 100%;
      background: rgba(0, 0, 0, 0.562);
    }
  }
}
.skill {
  opacity: 0;
  display: inline-block;
  text-align: center;
  font-weight: 600;
  img {
    margin: auto;
    max-width: 100px;
    max-height: 100px;
  }
}
.up-hover {
  transition: all 0.3s;
  &:hover {
    transform: translateY(-0.5em);
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
  transition: all 1s;
  opacity: 1;
}
@media (max-width: 900px) {
  header {
    font-size: 0.7em;
    h3 {
      padding: 0 5% 4em 5%;
    }
    img {
      max-width: 40%;
    }
  }
  #description {
    font-size: 0.7em;
    div {
      font-size: 0.5em;
    }
  }
  .skill {
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
}
</style>
