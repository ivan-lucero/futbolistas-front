import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import axios, { Axios } from "axios"

function App() {
    const baseUrl = 'http://127.0.0.1:8000/api/' 
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const [futbolistaSeleccionado, setFutbolistaSeleccionado] = useState({
        'id': '',
        'nombres': '',
        'apellidos': ''
    });

    const seleccionarFutbolista = (futbolista, caso) => {
        setFutbolistaSeleccionado(futbolista);
        if(caso === "Editar")
            abrirCerrarModalEditar()
        else
        abrirCerrarModalEliminar()
    }

    const handleChange = e => {
        const {name, value} = e.target
        setFutbolistaSeleccionado((prevState) => (
        {
            ...prevState,
            [name]: value
        }))
    }

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const getAll = async (url) => {
        await axios.get(url)
        .then(response=>{
            console.log(response)
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    };

    const postData = async () => {
        fetch(baseUrl+"futbolistas", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(futbolistaSeleccionado), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        }).then(res => {
            console.log(res.body)
            setData(data.concat(res.body));
            abrirCerrarModalInsertar();
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }

    const putData = async () => {
        console.log(futbolistaSeleccionado)
        
        fetch(`${baseUrl}futbolistas/${futbolistaSeleccionado.id}`, {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(futbolistaSeleccionado), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
        }).then(res => {
            console.log(res)
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
        abrirCerrarModalEditar()
    }

    const deleteData = async () => {
        fetch(`${baseUrl}futbolistas/${futbolistaSeleccionado.id}`, {
            method: 'DELETE', // or 'PUT'
            }).then(res => {
                console.log(res)
            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
            abrirCerrarModalEliminar()
    }

    useEffect(() => {
        getAll(baseUrl+"futbolistas")
    },[])
    
    return(
    <div style={{textAlign: 'center'}}>
        
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(futbolista => (
                        <tr key={futbolista.id}>
                            <td>{futbolista.id}</td>
                            <td>{futbolista.nombres}</td>
                            <td>{futbolista.apellidos}</td>
                            <td>
                                <button className='btn btn-primary' onClick={()=>seleccionarFutbolista(futbolista, "Editar")}>Editar</button>
                                <button className='btn btn-danger' onClick={()=>seleccionarFutbolista(futbolista, "Eliminar")}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <button className='btn btn-success' onClick={abrirCerrarModalInsertar}>Insertar</button>
        
        <Modal isOpen={modalInsertar}>
            <ModalHeader>Insertar Framework</ModalHeader>
            <ModalBody>
                <div className='form-group'>
                    <label>Nombre: </label>
                    <br/>
                    <input type="text" className='form-control' name='nombres' onChange={handleChange}></input>
                    <label>Apellido: </label>
                    <br/>
                    <input type="text" className='form-control' name='apellidos' onChange={handleChange}></input>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary' onClick={postData}>Insertar</button>
                <button className='btn btn-danger' onClick={abrirCerrarModalInsertar}>Cancelar</button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalEditar}>
            <ModalHeader>Editar Framework</ModalHeader>
            <ModalBody>
                <div className='form-group'>
                    <label>Nombre: </label>
                    <br/>
                    <input 
                        type="text" 
                        className='form-control' 
                        name='nombres' 
                        onChange={handleChange} 
                        value={futbolistaSeleccionado && futbolistaSeleccionado.nombres}></input>
                    <label>Apellido: </label>
                    <br/>
                    <input 
                        type="text" 
                        className='form-control' 
                        name='apellidos' 
                        onChange={handleChange}
                        value={futbolistaSeleccionado && futbolistaSeleccionado.apellidos}></input>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-primary' onClick={putData}>Comfirmar</button>
                <button className='btn btn-danger' onClick={abrirCerrarModalEditar}>Cancelar</button>
            </ModalFooter>
        </Modal>
    
        <Modal isOpen={modalEliminar}>
            <ModalBody>
                <p>¿Estás seguro que deseas eliminar al jugador {futbolistaSeleccionado.nombres} {futbolistaSeleccionado.apellidos}?</p> 
            </ModalBody>
            <ModalFooter>
                <button className='btn btn-danger' onClick={deleteData}>Si</button>
                <button className='btn btn-secondary' onClick={abrirCerrarModalEliminar}>No</button>
            </ModalFooter>
        </Modal>
    
    </div>
    );
}

export default App;
