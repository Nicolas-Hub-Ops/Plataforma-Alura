
<template>
    <div>
        <title>Sobre</title>
        <div class="container">
            <div class="sobre">
                <h1 class="title-sobre"> Sobre </h1>
                <div>
                    <p class="alinhamento">
                        Hycade é um canal de video do youtube, em que por meio de design e computação, cria versões super modificadas de carros que temos atualmente.
                    </p>
                    <br>
                    <p class="alinhamento">
                        Então com influência e para ajudar a organizar os projetos realizados pelo dono do canal, construímos um site para armazenar os projetos, deixando assim bem explicativos e mostrando tudo o que ele faz por aqui.
                    </p>
                </div>
            </div>
        </div>
    
            <div class="space-video">
                <iframe 
                    class="video" 
                    width="915" 
                    height="515" 
                    style="margin-left: 5%; border-radius: 20px;"
                    src="https://www.youtube.com/embed/-AOr-UqieaU" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
                <iframe 
                    class="video" 
                    width="915" 
                    height="515"
                    style="margin-left: 40%; border-radius: 20px;" 
                    src="https://www.youtube.com/embed/m26guQNZ8p0" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
    </div>
</template>
<script>

</script>
<style>
    .container {
        padding: 0% 20%  5% 20%;
        color: #fff;
    }

    .sobre {
        padding-bottom: 7em;
        font-family: 'Iceland', cursive;
    }

    .title-sobre {
        text-align: center;
        margin-top: 1em;
        font-family: 'Iceland', cursive;
        color: yellow;
    }

    .alinhamento {
        text-align: center;
        margin-top: 1em;
    } 

    div p div {
        margin-top: 2em;
        font-family: 'Iceland', cursive;
    }

    div p {
        font-family: 'Iceland', cursive;
        font-size: 20px;
    }

    space-video {
        margin: 0;
        padding: 0;
    }



</style>