import Input from '../Input';
import  './Form.css';

export default function Form() {

    const option = [
        'Programação', 
        'Front-End',
        'Data Science',
        'DevOps',
        'Mobile',
        'UX e Design',
    ]

    return (
        <form className="form-register">
            <div>
                <Input type="text" label="Nome" placeholder="Nome"/>
                <Input type="img" label="Foto" placeholder="Imagem"/>
                <Input type="list" label="Time" options={option}/>
                <Input type="submit" value="Salvar"/>
            </div>
        </form>
    )
}