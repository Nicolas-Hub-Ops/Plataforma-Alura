import './style.css';

const Inputs = (props) => {
    if(props.type) {
        if(props.type === 'text' | props.type === 'number' | props.type === 'email') {
            return (
                <div className='container-padrao'>
                    <input className='input-padrao' type={props.type} placeholder={props.placeholder}/> 
                </div>
            )
        }
        if(props.type === 'file') {
            return (
                <div className='container-padrao'>
                    <input className='input-file' type="file"/> 
                </div>
            )
        }
    } else {
        console.log('Sem formulário')
    }
}

export default Inputs;