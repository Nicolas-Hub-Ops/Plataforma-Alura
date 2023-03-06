import ButtonRandomDogs from '../Button';
import '../Image/style.css'; 
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Page.css';

const PageRandomDogs = () => {

    const [dogs, setDogs] = useState('');
    
  
        const getDogs = async () => {
            try {
                const res = await axios.get('https://random.dog/woof/');
                const data = `https://random.dog/${res.data}`;
                console.log(data);
                setDogs(data);
                
            } catch (error) {
                console.log(error)   
            }
        }

        if(dogs === '') {
            setDogs('https://tse1.mm.bing.net/th?id=OIP.NYo1vmEJQrktxQaGLqmW9AHaE9')
        }

        function getFileExtension(filename) {
            return filename.split('.').pop();
          }

        const video = () => {
            return (
                <video className="video" controls={true} autoPlay={true}>
                    <source src={dogs}  type="video/mp4"/>
                </video>
            )
        }


    return(
        <div className='page'>
            <p>Clique no botão para atualizar a imagem</p>
            <ButtonRandomDogs title="Refresh" action={getDogs}/>
            <div className='image-randomDogs'>
                {
                    getFileExtension(dogs) === 'mp4' ?  video() : <img src={dogs} alt="Response"/>
                }
                
            </div>
        </div>
    )
}

export default PageRandomDogs;