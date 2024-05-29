"use client"

import Link from "next/link";
import Style from "./page.module.css";
import {useState, useEffect} from 'react'
import { IconTrash2 } from '@supabase/ui';

export default function Denuncias(){
    const [denuncias, setDenuncias] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editDenuncia, setEditDenuncia] = useState({ id: null, local: '', descricao: '' });
    const [mensagem, setMensagem] = useState('');

    useEffect(() =>{
        async function fetchDenuncias() {
            try {
                const response = await fetch('http://localhost:3001/denuncias');
                const data = await response.json();
                setDenuncias(data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchDenuncias()
    }, [])

    const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost:3001/denuncias/${id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            setDenuncias(denuncias.filter(denuncia => denuncia.id !== id));
          }
        } catch (e) {
          console.log(e);
        }
    };

    const handleEdit = (denuncia) => {
        setIsEditing(true);
        setEditDenuncia(denuncia);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/denuncias/${editDenuncia.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editDenuncia),
            });

            if (response.ok) {
                setDenuncias(denuncias.map(d => (d.id === editDenuncia.id ? editDenuncia : d)));
                setMensagem('Denúncia atualizada com sucesso!');
                setTimeout(() => {
                    setIsEditing(false);    
                    setMensagem('');
                }, 1500);
                setEditDenuncia({ id: null, local: '', descricao: '' });
            }
        } catch (e) {
            console.log(e);
            setMensagem('Erro ao atualizar denúncia.');
            setTimeout(() => {
                setMensagem('');
            }, 3000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditDenuncia(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>  
            <header className={Style.denuncias}>
                <h1>Denúncias</h1>
            </header>  
            <div className={Style.botoes}>
                <Link className={Style.botaoVoltar} href="/">Voltar</Link>
                <Link className={Style.botaoNovaDenuncia} href="/paginaNovaDenuncia">+</Link>
            </div>

            {
                isEditing && ( 
                    <form onSubmit={handleUpdate} className={Style.form}>
                        <div className={Style.formGroup}>
                            <label htmlFor="local" className={Style.label}>Local:</label>
                            <input
                                type="text"
                                id="local"
                                name="local"
                                value={editDenuncia.local}
                                onChange={handleChange}
                                required
                                className={Style.input}
                            />
                        </div>
                        <div className={Style.formGroup}>
                            <label htmlFor="descricao" className={Style.label}>Descrição:</label>
                            <textarea
                                id="descricao"
                                name="descricao"
                                value={editDenuncia.descricao}
                                onChange={handleChange}
                                required
                                className={Style.textarea}
                            />
                        </div>
                        <button type="submit" className={Style.button}>Atualizar Denúncia</button>
                        {mensagem && <p className={Style.mensagem}>{mensagem}</p>}
                    </form>
                )
            }

            {denuncias && denuncias.map((denuncia) => (
                <div key={denuncia.id} className={Style.denuncia}>
                    <div className={Style['denuncia-header']}>
                        <div className={Style.local}>{denuncia.local}</div>
                        <div>
                            <button onClick={() => handleEdit(denuncia)} className={Style.botaoAtualiza}>Editar</button>
                            <button onClick={() => handleDelete(denuncia.id)} className={Style.botaoDeleta}><IconTrash2/></button>
                        </div>
                    </div>
                    <div className={Style.descricao}>{denuncia.descricao}</div>
                </div>
            ))}

        </>
    );
} 
