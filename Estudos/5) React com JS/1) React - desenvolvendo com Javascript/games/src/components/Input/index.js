import './Input.css';

export default function Input(props) {

    if(props.type === 'text' | props.type === 'password') {
        return (
            <div className="container-text-password">
                <label>{ props.label }</label>
                <input type={props.type} placeholder={props.placeholder}/>
            </div>
        )
    }
    if(props.type === 'submit') {
        return (
            <div className="container-submit">
                <input type={props.type} value={props.value}/>
            </div>
        )
    }
    if(props.type === 'list') {
        return (
            <div className="container-list">
                <label>{props.label}</label>
                <select>
                    {props.options.map( option => <option>{option}</option> )}
                </select>
            </div>
        )
    }
    if(props.type === 'img') {
        return (
            <div className="container-img">
                <label>{props.label}</label>
                <input type="text" placeholder={props.placeholder}></input>
                <img src="" alt="Imagem da capa"/>
            </div>
        )
    }
}