<template>  
         <div>
            <title>Home</title>
            <body>
               <div class="page">
                  <div class="field field_v1">
                     <label for="first-name" class="ha-screen-reader">Search</label>
                     <input id="first-name" class="field__input" v-on:input="(filtro = $event.target.value)" placeholder="ex: Nissan . . .">
                     <span class="field__label-wrap" aria-hidden="true" >
                        <span class="field__label">Search</span>
                     </span>
                  </div>   
               </div>
               <main>
                  <ul v-for="car of albumComFiltro">
                     <li>
                        <h2 class="tituloAlbum"> {{ car.titulo }} </h2>
                        <img :src="car.imageInitial" v-bind:alt="car.titulo" class="fotoTitulo" @click="car.visivel = !car.visivel">
                        <div class="grupoEspaçamento">
                           <div v-for="images of car.images" class="albumGaleria" v-show="car.visivel">
                              <img v-bind:src="images.url" :alt="cars.titulo" class="fotosAlbum">
                           </div>
                        </div>
                     </li>
                  </ul>
               </main>
            </body>
         </div>
</template>


<script>

   export default {

      data() {
         return {
            cars: [],
            filtro: ''
         }
      },

      created() {
         let promise = this.$http.get('http://localhost:3000/upload');
            promise.then(res => {
                  res.json().then(response => {
                     var counter = response.length;
                     for( var i = 0; i < counter; i++ ) {
                        var model = {
                           titulo: response[i].titulo,
                           imageInitial: `http://localhost:3000/files/${response[i].keyInicial}`,
                           visivel: false,
                           images: [
                              {url: `http://localhost:3000/files/${response[i].key1}`},
                              {url: `http://localhost:3000/files/${response[i].key2}`},
                              {url: `http://localhost:3000/files/${response[i].key3}`},
                              {url: `http://localhost:3000/files/${response[i].key4}`},
                              {url: `http://localhost:3000/files/${response[i].key5}`},
                              {url: `http://localhost:3000/files/${response[i].key6}`},
                              {url: `http://localhost:3000/files/${response[i].key7}`},
                              {url: `http://localhost:3000/files/${response[i].key8}`},
                              {url: `http://localhost:3000/files/${response[i].key9}`},
                              {url: `http://localhost:3000/files/${response[i].key10}`},
                           ]
                        }
                        this.cars.push(model);
                     }
               });
            });
         },

      computed: {
         albumComFiltro() {
            if(this.filtro) {
               let exp = new RegExp(this.filtro.trim(), 'i');
               return this.cars.filter(car => exp.test(car.titulo))
            }
            else {
               return this.cars;
            }
         }
      }
   }
</script>


<!-- Estilo geral de Home.vue -->
<style scoped>
   body {
      font-family: 'Iceland', cursive;
   }

   main {
      padding-top: 10em;
   }
   
   .fotoTitulo { 
      border-radius: 15px;
      margin-bottom: 5px;
      width: 40%;
      height: 20%;
      box-shadow: 1px 1px 10px 1px yellow;
   }
   .fotoTitulo:hover {
      cursor: pointer;
   }
   
   
   .fotosAlbum {
      display: inline-block;
      border-radius: 15px;
      margin-bottom: 5px;
      width: 30%;
      height: 15%;
      margin-left: 10px;
      box-shadow: 1px 1px 10px 1px yellow;
   }


   .albumGaleria {
      display: inline;
   }
   
   .tituloAlbum {
      color: white;
      /*margin-left: 130px;*/
      margin-left: 2em;
      font-size: 30px;
      font-style: oblique;
      margin-bottom: 10px;
      font-family: 'Iceland', cursive;
      text-shadow: 0 0 5px yellow, 0 0 10px yellow, 0 0 15px yellow, 0 0 20px yellow,
      0 0 35px yellow, 0 0 40px yellow, 0 0 50px yellow, 0 0 75px yellow;
      /*animation: pulsar 2s ease-in-out alternate infinite;*/
   }
   
   ul {
      display: inline-block;
      margin-left: 60px;
      margin-bottom: 50px;
   }
   
   
   .grupoEspaçamento{
      margin-left: -10px;
   }
   
   @media (max-width: 999px) {
      .tituloAlbum {
         font-size: 30px;
      }
      
      .fotoTitulo {
         width: 500px;
         height: 290px;
      }

      .fotosAlbum {
         width: 500px;
         height: 290px;
      }
   }
   
   @keyframes pulsar {
      0% {
         text-shadow: 0 0 5px white, 0 0 10px white, 0 0 15px white, 0 0 20px white,
         0 0 35px white, 0 0 40px white, 0 0 50px white, 0 0 75px white;
      }
      50% {
         text-shadow: 0 0 5px yellow, 0 0 10px yellow, 0 0 15px yellow, 0 0 20px yellow,
         0 0 35px yellow, 0 0 40px yellow, 0 0 50px yellow, 0 0 75px yellow;
      }
      100% {
         text-shadow: 0 0 5px white, 0 0 10px white, 0 0 15px white, 0 0 20px white,
         0 0 35px white, 0 0 40px white, 0 0 50px white, 0 0 75px white;
      }
   }


   
   
   
</style>


<!-- Estilo do Input de pesquisa -->
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Iceland&display=swap');
.ha-screen-reader{
   width: var(--ha-screen-reader-width, 1px);
  height: var(--ha-screen-reader-height, 1px);
  padding: var(--ha-screen-reader-padding, 0);
  border: var(--ha-screen-reader-border, none);
  position: var(--ha-screen-reader-position, absolute);
  clip: var(--ha-screen-reader-clip, rect(1px, 1px, 1px, 1px));
  overflow: var(--ha-screen-reader-overflow, hidden);
  color: #fff;
  font-family: 'Iceland', cursive;
}

.field__input{ 
   --uiFieldPlaceholderColor: var(--fieldPlaceholderColor, #767676);
  background-color: transparent;
  border-radius: 0;
  border: none;
  font-family: 'Iceland', cursive;
  color: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-family: inherit;
  font-size: inherit;
}

.field__input:focus::-webkit-input-placeholder{
  color: var(--uiFieldPlaceholderColor);
}

.field__input:focus::-moz-placeholder{
   color: var(--uiFieldPlaceholderColor);
}

/*
=====
CORE STYLES
=====
*/

.field{
   --uiFieldBorderWidth: var(--fieldBorderWidth, 2px);
  --uiFieldPaddingRight: var(--fieldPaddingRight, 1rem);
  --uiFieldPaddingLeft: var(--fieldPaddingLeft, 1rem);   
  --uiFieldBorderColorActive: var(--fieldBorderColorActive, rgba(22, 22, 22, 1));

  display: var(--fieldDisplay, inline-flex);
  position: relative;
  font-size: var(--fieldFontSize, 1rem);
}

.field__input{
   font-family: 'Iceland', cursive;
   box-sizing: border-box;
   width: var(--fieldWidth, 100%);
   height: var(--fieldHeight, 3rem);
   padding: var(--fieldPaddingTop, 1.25rem) var(--uiFieldPaddingRight) var(--fieldPaddingBottom, .5rem) var(--uiFieldPaddingLeft);
   border-bottom: var(--uiFieldBorderWidth) solid var(--fieldBorderColor, rgba(0, 0, 0, .25));  
}

.field__input:focus{
   outline: none;
}

.field__input::-webkit-input-placeholder{
  opacity: 0;
  transition: opacity .2s ease-out;
}

.field__input::-moz-placeholder{
   opacity: 0;
   transition: opacity .2s ease-out;
}

.field__input:focus::-webkit-input-placeholder{
  opacity: 1;
  transition-delay: .2s;
}

.field__input:focus::-moz-placeholder{
  opacity: 1;
  transition-delay: .2s;
}

.field__label-wrap{
   box-sizing: border-box;
  pointer-events: none;
  cursor: text;
  font-family: 'Iceland', cursive;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.field__label-wrap::after{
  content: "";
  box-sizing: border-box;
  width: 100%;
  height: 0;
  opacity: 0;
  
  position: absolute;
  bottom: 0;
  left: 0;
}

.field__input:focus ~ .field__label-wrap::after{
   opacity: 1;
}

.field__label{
   position: absolute;
  left: var(--uiFieldPaddingLeft);
  top: calc(50% - .5em);
  color: yellow;
  line-height: 1;
  font-size: var(--fieldHintFontSize, inherit);
  font-family: 'Iceland', cursive;
  transition: top .2s cubic-bezier(0.9, -0.15, 0.1, 1.15), opacity .2s ease-out, font-size .2s ease-out;
}

.field__input:focus ~ .field__label-wrap .field__label,
.field__input:not(:placeholder-shown) ~ .field__label-wrap .field__label{
  --fieldHintFontSize: var(--fieldHintFontSizeFocused, .75rem);
  
  top: var(--fieldHintTopHover, .25rem);
}

/* 
effect 1
*/

.field_v1 .field__label-wrap::after{
  border-bottom: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  transition: opacity .2s ease-out;
}

/* 
effect 2
*/

.field_v2 .field__label-wrap{
  overflow: hidden;
}

.field_v2 .field__label-wrap::after{
   border-bottom: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
  transform: translate3d(-105%, 0, 0);
  transition: transform .285s ease-out .2s, opacity .2s ease-out .2s;
}

.field_v2 .field__input:focus ~ .field__label-wrap::after{
  transform: translate3d(0, 0, 0);
  transition-delay: 0;
}

/*
effect 3
*/

.field_v3 .field__label-wrap::after{
   border: var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive);
   transition: height .2s ease-out, opacity .2s ease-out;
}

.field_v3 .field__input:focus ~ .field__label-wrap::after{
  height: 100%;
}

/*
=====
LEVEL 4. SETTINGS
=====
*/

.field{
  --fieldBorderColor: yellow;
  --fieldBorderColorActive: blueviolet;
}

/*
=====
DEMO
=====
*/

.page{
   box-sizing: border-box;
   width: 100%;
   max-width: 480px;
   margin: auto;
   padding: 1rem;
   
   display: grid;
  grid-gap: 30px;
}

.linktr{
   order: -1;
   padding: 1.75rem;
   text-align: center;
}

.linktr__goal{
  background-color: rgb(209, 246, 255);
  color: rgb(8, 49, 112);
  box-shadow: rgb(8 49 112 / 24%) 0px 2px 8px 0px;
  border-radius: 2rem;
  padding: .5rem 1.25rem;
}

@media (min-width: 1024px){
   
   .linktr{
    position: absolute; 
    right: 1rem; 
    bottom: 1rem;
   }
}

.r-link{
   --uirLinkDisplay: var(--rLinkDisplay, inline-flex);
   --uirLinkTextColor: var(--rLinkTextColor);
   --uirLinkTextDecoration: var(--rLinkTextDecoration, none);
   
   display: var(--uirLinkDisplay) !important;
   color: var(--uirLinkTextColor) !important;
   text-decoration: var(--uirLinkTextDecoration) !important;
}


</style>
