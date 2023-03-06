import Carrinho from "../carrinho";
import Item from "../item";

describe('Testes relacionados ao carrinho', () => {
  it('Carrinho deve ser vazio ao inicializar', () => {
    const carrinho = new Carrinho();
    expect(carrinho.subtotal).toBeNull();
  });

  it('Deve adicionar itens', () => {
    const item1 = new Item('HotWheels', 10, 2);
    const item2 = new Item('Brownie', 15, 1);

    const carrinho = new Carrinho();
    carrinho.adiciona(item1);
    carrinho.adiciona(item2);

    expect(typeof carrinho). toBe('object');
    expect(carrinho.itens[0]).toBe(item1);
    expect(carrinho.itens[1]).toBe(item2);

    expect(carrinho.itens).toContain(item1);
    expect(carrinho.itens).toContain(item2);
  });

  it('Deve apresentar a propriedade "total" na inicialização', () => {
    const carrinho = new Carrinho();

    expect(carrinho).toHaveProperty('total');
  });

  it('Deve lançar erro ao finalizar compra com carrinho vazio', () => {
    function englobaErroCarrinho() {
      const carrinho = new Carrinho();
      carrinho.finalizaCompra();
    };

    expect(englobaErroCarrinho).toThrowError('Carrinho de compras vazio');
  });

  it('Deve adicionar o frete', () => {
    const carrinho = new Carrinho();
    carrinho.adicionaFrete(10);

    expect(carrinho.frete).toBe(10);
  });

  it('Deve finalizar as compras', () => {
    const carrinho = new Carrinho();
    const item1 = new Item('BeamNG Drive', 150, 1);
    const item2 = new Item('Need For Speed', 200, 1);

    carrinho.adiciona(item1);
    carrinho.adiciona(item2);

    carrinho.adicionaFrete(50);

    expect(carrinho.finalizaCompra()).toStrictEqual({ 
      subtotal: 350,
      frete: 50,
      total: 400,
    });
  });
});
