
print('|---------------------------------------------------|')
print('|                   Testes Kaggle                   |')
print('|---------------------------------------------------|')

print('==> Docstrings')

def teste02(a, b, c):
    """Retorna a menor difença entre 2 numeros
        >>> teste02(1, 5, -5)
            4
    """
    diff1 = abs(a - b)
    diff2 = abs(b - c)
    diff3 = abs(a - c)
    return min(diff1, diff2, diff3)

help(teste02)
help(round)

print(1, 2, 3, sep=' < ')


print('')
print('==> Optional Argument')

def optional(a='Sargento', b='Fahur'):
    print('Olá, {} {}'.format(a, b))

optional()

print('')
print('==> FN applied FN')

def multiply_five(x):
    return 5 * x;

def call(fn, arg):
    """ Chama a função """
    return fn(arg);

def arredonda(numero):
    return round(numero, 2)

print(arredonda(130.343))

print('==> ')


def to_smash(total_candies, friends = 3):
    """Return the number of leftover candies that must be smashed after distributing
    the given number of candies evenly between 3 friends.

    >>> to_smash(91)
    1
    """
    return total_candies % friends;

print('RESULTADOS: {}'.format(to_smash(20, 5)))

print('==> Condicionais e booleans 01')

def sign(a):
    if(a < 0):
        return -1;
    elif(a > 0):
        return 1;
    else:
        return 0;

print(sign(0.001))

print('==> Condicionais e booleans 02')


def to_smash(total_candies):
    """Return the number of leftover candies that must be smashed after distributing
    the given number of candies evenly between 3 friends.

    >>> to_smash(91)
    1
    """
    if (total_candies > 1):
        print("Splitting", total_candies, "candies")
    elif (total_candies == 1):
        print("Splitting", total_candies, "candy")
    return total_candies % 3


to_smash(91)
to_smash(1)

print('==> QUestion 5')

def prepared_for_weather(have_umbrella, rain_level, have_hood, is_workday):
    return have_umbrella or rain_level < 5 and have_hood or not rain_level > 0 and is_workday

have_umbrella = False
rain_level = 5.0
have_hood = True
is_workday = True
actual = prepared_for_weather(have_umbrella, rain_level, have_hood, is_workday)
print(actual)

def is_negative(number):
    if number < 0:
        return True
    else:
        return False

def concise_is_negative(number):
    return number < 0;

print('Question 4: {}'.format(concise_is_negative(-3)))

atividade = bool(int())

print('Question 6: {}'.format(atividade))
