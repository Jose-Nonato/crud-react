import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../Home/styles.css';
import firebaseDB from '../../config/firebase';
import { toast } from 'react-toastify';

const Home = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        firebaseDB.child('users').on('value', (snapshot) => {
            if(snapshot.val() !== null) {
                setData({
                    ...snapshot.val(),
                })
            } else {
                setData({});
            }
        });

        return() => {
            setData({});
        }
    }, []);

    const onDelete = (id) => {
        if(window.confirm("Certeza que deseja excluir este registro ?")) {
            firebaseDB.child(`users/${id}`).remove((err) => {
                if(err) {
                    console.log(err);
                } else {
                    toast.success("Usuário excluído com sucesso");
                }
            });
        };
    };

    return(
        <div className='home'>
            <table className='styled-table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Contato</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id, index) => {
                        return(
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{data[id].name}</td>
                                <td>{data[id].email}</td>
                                <td>{data[id].contact}</td>
                                <td>
                                    <Link to={`/update/${id}`}>
                                        <button className='btn btn-edit'>Editar</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => onDelete(id)}>Excluir</button>
                                    <Link to={`/view/${id}`}>
                                        <button className='btn btn-view'>Visualizar</button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Home;