import './CampoTexto.css'

let valor = '';

const digitado = (event) => {
    valor = event.target.value;
    console.log(valor);
}

const CampoTexto = (props) => {
    return (
        <div className="campo-texto">
            <label>{props.label}</label>
            <input onChange={digitado} required={props.obrigatorio} placeholder={props.placeholder}/>
        </div>
    )
}

export default CampoTexto