import {
  describe, expect, it, jest,
} from '@jest/globals';
import Editora from '../../models/editora';

describe('Testando modelo Editora', () => {
  const objectEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'c@c.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objectEditora);
    expect(editora).toEqual(expect.objectContaining(objectEditora));
  });
  /*
  it.skip('Deve salvar editora no DB', () => {
    const editora = new Editora(objectEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  it('Deve salvar em DB com sitaxe moderna', async () => {
    const editora = new Editora(objectEditora);
    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objectEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
*/
  it('Deve fazer uma chamada simulada ao DB', () => {
    const editora = new Editora(objectEditora);

    editora.salvar = jest.fn().mockReturnValue({
      id: 10,
      nome: 'CDC',
      cidade: 'São Paulo',
      email: 'c@c.com',
      created_at: '2022-11-15',
      updated_at: '2022-11-15',
    });

    const retorno = editora.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objectEditora,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
