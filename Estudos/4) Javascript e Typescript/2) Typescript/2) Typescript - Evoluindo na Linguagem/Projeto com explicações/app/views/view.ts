export abstract class View<T> {
    // abstract class => PERMITE INSTANCIAR SOMENTE A CLASSES FILHAS
    // <T> => PERMITE ESPECIFICAR O TYPE AO DECLARAR A FUNÇÃO NA CLASSE FILHA
    
    // PROTECTED MANTEM ACESSO AO HERDADORES
    // PUBLIC MANTEM ACESSO A QUALQUER UM
    // PRIVATE MANTEM ACESSO SOMENTE A QUEM INSTANCIOU
    protected elemento: HTMLElement;
    private escapar = false;

    constructor(seletor: string, escapar?: boolean) {
        const elemento = document.querySelector(seletor);
        if(elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM`)
        }
        if(escapar) {
            this.escapar = escapar;
        }
    }

    protected abstract template(model: T): string;
    // abstract template => TORNA OBRIGATÓRIO A IMPLEMENTAÇÃO DESSA FUNÇÃO NA CLASSE FILHAS

    public update(model: T): void {
        let template = this.template(model);
        // escapar => IMPEDE A INJEÇÃO DE CÓDIGO MALICIOSO A PARTIR DO <script></script>
        if(this.escapar) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.elemento.innerHTML = template;
    }
}