import random

def jogar():
    print("|-----------------------------------------------------|")
    print("|  Bem vindo ao jogo de adivinhação usando Python 3!  |")
    print("|-----------------------------------------------------|")

    print('Qual o nível do jogos?');
    print('(1) - Fácil');
    print('(2) - Médio');
    print('(3) - Difícil');
    nivel = int(input('Defina o nível do jogo:'));

    tentativas = 0;
    pontos = 1000;

    if(nivel == 1):
        tentativas = 20
    elif(nivel == 2):
        tentativas = 10
    else:
        tentativas = 5

    numero_secreto = random.randrange(1, 101);
    print(numero_secreto);

    for rodada in range(1, tentativas + 1):
        print("Tentativas {} de {}".format(rodada, tentativas))
        chute = int(input("Digite um número entre 1 e 100: "))

        print("Você digitou:", chute)

        if(chute < 1 or chute > 100):
            print('Você deve digitar um número entre 0 e 100!')
            continue

        acertou = chute == numero_secreto
        maior = chute > numero_secreto
        menor = chute < numero_secreto

        if(acertou):
            print("Você acertou e fez {} pontos !!!".format(pontos))
            break
        else:
            if(maior):
                print("Você errou! Seu chute foi maior que o numero")
            elif(menor):
                print("Você errou! Seu chute foi menor que o numero")

            pontos_perdidos = abs(numero_secreto - chute)
            pontos = pontos - pontos_perdidos

    print("|-----------|")
    print("|Fim do Jogo|")
    print("|-----------|")

if(__name__ == "__main__"):
    jogar()