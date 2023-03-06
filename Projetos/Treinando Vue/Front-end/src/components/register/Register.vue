<template>
    <div>
    <title>Cadastro</title>
    <h1 class="title-register"> Cadastro de Albuns </h1>
    
        <form @submit.prevent="saveAlbum()" enctype="multipart/form-data">
            <div class="page">
              <div class="field field_v1">
                <label for="first-name" class="ha-screen-reader">Titulo do Album</label>
                    <input id="first-name" class="field__input" @input="(album.titulo = $event.target.value)" placeholder="ex: Nissan GTR Vísion . . .">
                    <span class="field__label-wrap" aria-hidden="true" >
                      <span class="field__label">Titulo do Album</span>
                    </span>
                  </div>   
                </div>
                <div>
                  <ul>
                    <input class="upload-titulo" id="image-initial" type="file" name="arquivo" @input="(album.imageInicial = $event.target.value)"><br>
                    <!--<input class="upload" type="file" name="file" @input="(album.image1 = $event.target.value)">
                    <input class="upload" type="file" name="file" @input="(album.image2 = $event.target.value)">
                    <input class="upload" type="file" name="file" @input="(album.image3 = $event.target.value)">
                    <input class="upload" type="file" name="file" @input="(album.image4 = $event.target.value)">
                    <input class="upload" type="file" name="file" @input="(album.image5 = $event.target.value)">
                    <input class="upload" type="file" name="file" @input="(album.image6 = $event.target.value)">
                    <input class="upload" type="file" name="file" @input="(album.image7 = $event.target.value)">
                    <input class="upload" type="file" name="file" @input="(album.image8 = $event.target.value)">
                    <input class="upload" type="file" name="file" @input="(album.image9 = $event.target.value)">
                    <input class="upload" type="file" name="file" @input="(album.image10 = $event.target.value)">-->
                  </ul>
                </div>
              <button class="btn" id="btn">
                    Submit
                  </button>
        </form>
    </div>
</template>

<script>

export default {

  data() {
    return {
      album: {
        titulo: '',
        imageInicial: '',
        /*image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        image6: '',
        image7: '',
        image8: '',
        image9: '',
        image10: '',*/
      }
    }
  },

  computed: {
    saveAlbum() {
      console.log(this.album)
    }
  }

}


</script>


<!-- Estido Geral --> 
<style scoped>

.title-register {
  text-align: center;
  margin: 1em 0 3em 0;
  font-family: 'Iceland', cursive;  
  color: yellow;
}

::-webkit-file-upload-button {
  font-family: 'Iceland', cursive;  
  background: blueviolet;
  border: none;
  border-radius: 10px;
  color: #fff;
  padding: 5%;
}
.upload-titulo {
  font-family: 'Iceland', cursive;  
  font-size: 20px;
  align-items: center;
  display: block;
  backdrop-filter: blur(20px);
    padding: 2% 4%;
    border-radius: 5px;
    border: 2px solid yellow;
    margin-left: 35%; 
    margin-top: 1%;
    color: #fff;
    transition: all 0.2s;
  }
  .upload-titulo:hover {
    box-shadow: 0px 0px 50px 0px yellow inset;
  }
  
  .upload {
    backdrop-filter: blur(20px);
    padding: 2% 4%;
    border-radius: 5px;
    border: 2px solid yellow;
    margin-left: 17%; 
    margin-top: 5%;
    color: #fff;
    transition: all 0.2s;
  }
  .upload:hover {
    box-shadow: 0px 0px 50px 0px yellow inset;
    
  }
  .btn {
    font-size: 30px;
    padding: 1em 4em;
    font-weight: bolder;
    border: none;
    border-radius: 10px;
    font-family: 'Iceland', cursive;  
    background: blueviolet;
    color: #fff;
    border: 1px solid yellow;
    margin-left: 40.5%;
    margin-top: 3em;
    transition: all 0.2s;
  }
  .btn:hover {
    box-shadow: 0px 0px 1000px 0px yellow;
    transform: scale(1.1)
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
