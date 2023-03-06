import adivinhacao;
import forca;

print("|-----------------------------------------------------|")
print("|                    Escolha seu jogo                 |")
print("|-----------------------------------------------------|")

print('(1) - Forca')
print('(2) - Adivinhação')

jogo = int(input('Escolha oo jogo:'));

if(jogo == 1):
    forca.jogar()
elif(jogo == 2):
    adivinhacao.jogar()