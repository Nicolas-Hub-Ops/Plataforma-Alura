import './Formulario.css';
import CampoTexto from '../CampoTexto';
import ListaSuspensa from '../ListaSuspensa';
import Botao from '../Botao';

const Formulario = () => {
    const times = [
        'Programação',
        'Front-End',
        'Back-End', 
        'Data Science',
        'Dev-Ops',
        'Ux e Design',
        'Mobile',
        'Inovação e Gestão'
    ];

    const saved = (event) => {
        event.preventDefault();
        console.log('Informações foram salvas com sucesso!')
    }

    return (
        <section className='formulario'>
            <form onSubmit={saved}>
                <h2>Preencha os dados para criar o card do colaborador</h2>
                <CampoTexto obrigatorio={true} label="Nome" placeholder="Digite o seu nome"/>
                <CampoTexto obrigatorio={true} label="Cargo" placeholder="Digite seu cargo"/>
                <CampoTexto obrigatorio={false} label="Imagem" placeholder="Informe o endereço de imagem"/>
                <ListaSuspensa label="Time" itens={times}/>
                <Botao>Criar card</Botao>
            </form>
        </section>
    )
}

export default Formulario;