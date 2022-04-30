import React, {useState, useEffect} from 'react';
import firebaseDB from '../../config/firebase.js';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './styles.css';

const View = () => {
    const [data, setData] = useState({});
    let currentId = useParams();
    const {id} = currentId;
    const history = useNavigate();

    useEffect(() => {
        firebaseDB.child("contacts").on("value", (snapshot) => {
            if(snapshot.val() !== null) {
                setData({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
    }, [id]);

    return(
        <div className='container at-5'>
            {Object.keys(data).map((userId) => {
                if(userId === id) {
                    return(
                        <div key={userId} className="view">
                            <div className="card">
                                <div className="card-header">
                                    <p>Detalher do Usuário</p>
                                </div>
                                <div className="container">
                                    <strong>Nome: </strong>
                                    <span>{data[id].name}</span>
                                    <br />
                                    <br />
                                    <strong>Email: </strong>
                                    <span>{data[id].email}</span>
                                    <br />
                                    <br />
                                    <strong>Contact: </strong>
                                    <span>{data[id].contact}</span>
                                </div>
                                    <br />
                                    <br />
                                <Link to="/">
                                    <button className="btn btn-edit" onClick={() => history.push("/")}>
                                        Go Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}

export default View;