import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import firebaseDB from '../../config/firebase';
import { toast } from 'react-toastify';

const AddEdit = () => {
    const intialState = {
        name: '',
        email: '',
        contact: '',
    };

    const [state, setState] = useState(intialState);
    const [data, setData] = useState({});
    const { name, email, contact } = state;
    const history = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        firebaseDB.child("contacts").on("value", (snapshot) => {
            if(snapshot.val !== null) {
                setData({
                    ...snapshot.val(),
                })
            } else {
                setData({});
            }
        })
        return () => {
            setData({});
        }
    }, [id]);

    useEffect(() => {
        if(id) {
            setState({...data[id]});
        } else {
            setState({...intialState});
        }
        return() => {
            setState({...intialState});
        }
    }, [id, data]);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact) {
            toast.error('Por favor, preencha o valor de cada campo!');
        } else {
            if(!id) {
                firebaseDB.child("contacts").push(state, (err) => {
                    if(err) {
                        toast.error(err);
                    }else {
                        toast.success('Usuário adicionado com sucesso!');
                    }
                });
            } else {
                firebaseDB.child(`/contacts/${id}`).set(state, (err) => {
                    if(err) {
                        toast.error(err);
                    } else {
                        toast.success("Usuário atualizado com sucesso!");
                    } 
                });
            }
            setTimeout(() => history.push('/'), 500);
        };
    };

    return(
        <div className='add-edit'>
            <form className='add-edit_form' onSubmit={handleSubmit}>
                <label htmlFor='name'>Nome:</label>
                <input 
                type="text" 
                id='name' 
                placeholder='Digite seu nome ...' 
                value={name || ''} 
                onChange={handleInputChange}/>

                <label htmlFor='email'>Email:</label>
                <input 
                type="email" 
                id='email' 
                placeholder='Digite seu email ...' 
                value={email || ''} 
                onChange={handleInputChange}/>

                <label htmlFor="contact">Contact:</label>
                <input
                type="number" 
                id="contact" 
                name="contact" 
                placeholder="Digite seu contato ..."
                value={contact || ""} 
                onChange={handleInputChange}/>

                <input type="submit" value={id ? "Update" : "Save"} />
            </form>
        </div>
    );
}

export default AddEdit;