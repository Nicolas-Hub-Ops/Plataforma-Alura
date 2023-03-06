import "./style.css";
import React from 'react';
import { useState } from 'react';



const Form = () => {

    var [ url, setUrl ] = useState('');
    var [ code, setCode ] = useState('');

    const allStatus = [
        '100','101','102','103',
        '200','201','202','203','204','205','206','207','208','226',
        '300','301','302','303','304','305','306','307','308',
        '400','401','402','403','404','405','406','407','408','409','410','411','412','413','414',
        '415','416','417','418','420','422','423','424','425','426','428','429','431','444','449','450','451','499',
        '500','501','502','503','504','505','506','507','508','509','510','511','598','599',
    ];
    
    const action = (event) => {
        const inputValue = event.target.value;
        try { 
            if(inputValue.length === 3){
                for(var i = 0; i <= allStatus.length; i++){
                    if(inputValue === allStatus[i]){
                        setCode(inputValue);
                        setUrl(`https://http.cat/${inputValue}.jpg`);
                        break;
                    } else {
                        setCode('Status HTTP não encontrado')
                        setUrl('https://http.cat/404.jpg')
                    } 
                }
            }
        } catch(error) {
            console.log(error);
        }
    }

    if(url === '') {
        setUrl(`https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg`)
        setCode('-----')
    }
    
    return(
        <div>
            <div className='input-code'>
                <input type="number" onChange={action} placeholder='Status Code'/>
                <table className='table-status'>
                    <tbody className='tbody-status'>
                        <tr className='tr-tbody-status-cod'>
                            <td className='td-tbody-status'>Status Code:</td>
                            <td className='td-tbody-status-res'>{code}</td>
                        </tr>
                    </tbody>
                </table>
                <img className='image-http' src={url} alt="Response"/>
            </div>
        </div>
    )
} 

export default Form;