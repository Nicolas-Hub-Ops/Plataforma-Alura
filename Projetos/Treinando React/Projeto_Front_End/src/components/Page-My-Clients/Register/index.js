import Inputs from './Inputs';
import './style.css';

const Register = () => {
    return (
        <div className='div-form'>
            <form>
                <Inputs type="text" placeholder="Nome" />
                <Inputs type="email" placeholder="Email" />
                <Inputs type="number" placeholder="Telefone" />
                <Inputs type="text" placeholder="País" />
                <Inputs type="text" placeholder="Estado" />
                <Inputs type="number" placeholder="CPF" />
                <Inputs type="text" placeholder="CEP" />
                <Inputs type="text" placeholder="Estado Civil"/>
                <Inputs type="file"/>
            </form>
        </div>
    )
}

export default Register;