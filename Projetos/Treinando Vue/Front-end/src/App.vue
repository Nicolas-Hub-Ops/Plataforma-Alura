
<template>
  <div class="body">
      <header>
          <nav>
              <a class="logo" href="/">hycade</a>
              <div class="mobile-menu">
                  <div class="line-one"></div>
                  <div class="line-two"></div>
                  <div class="line-three"></div>
              </div>
              <ul class="nav-list">
                  <li><a class="" href="/">Início</a></li>
                  <li><a class="" href="/sobre">Sobre</a></li>
                  <li><a class="" href="/register">Cadastro</a></li>
                  <li><a class="" href="/login">Login</a></li>
              </ul>
          </nav>
      </header>
      <main>
          <transition name="page-transition">
              <router-view></router-view>  
          </transition>
      </main>
      <footer class="rodapé">
          <h2 class="textoRodapé">Hycade.com.br</h2>
      </footer>
  </div>
</template>

<script>
</script>

<style scoped>

@import url(./assets/css/reset.css);
@import url('https://fonts.googleapis.com/css2?family=Iceland&display=swap');



.body {
background-color: #fff;
background: url('./assets/wallpaper/GAMER-WALLPAPER-4K.png') no-repeat center center;
background-size: cover;
background-position: center;
background-repeat: no-repeat;
background-attachment: fixed;
}

a {
text-decoration: none;
color: yellow;
transition: all 0.2s;
font-size: 20px;
font-family: 'Iceland', cursive;
text-decoration: none;
}

ul li a:hover {
opacity: 0.7;
text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #fff,
   0 0 35px #fff, 0 0 40px #fff, 0 0 50px #fff, 0 0 75px #fff;
text-decoration: underline;
}


.logo {
font-size: 24px;
text-transform: uppercase;
letter-spacing: 4px;
font-family: 'Iceland', cursive;
}

nav {
display: flex;
justify-content: space-around;
align-items: center;
font-family: 'Iceland', cursive;
/*background: #332247;*/
background: linear-gradient(45deg, blueviolet, blueviolet, blue );
height: 8vh;
opacity: 0.8;

}

.nav-list {
list-style: none;
display: flex;
}

.nav-list li {
letter-spacing: 3px;
margin-left: 40px;
}

.mobile-menu {
display: none;
cursor: pointer;
}
.mobile-menu div {
width: 32px;
height: 2px;
background: #fff;
margin: 8px;
}

@media (max-width: 999px) {
.body {
  overflow-x: hidden;
}

.nav-list {
  position: absolute;
  top: 8vh;
  right: 0;
  width: 50vw;
  height: 92vh;
  background: #332247;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transform: translateX(100%);
}

.nav-list li {
  margin-left: 0;
  opacity: 0;
}

.mobile-menu {
  display: block;
}

.nav-list.active {
  transform: translateX(0);
}
}

.rodapé {
  padding: 30px 0px;
  margin-top: 10%;
  background: linear-gradient(45deg, blueviolet, blueviolet, blue );
  opacity: 0.8;
}

.textoRodapé {
  color: rgb(255, 255, 255);
  letter-spacing: 5px;
  font-family: 'Iceland', cursive;
  text-align: center;
}

</style>
