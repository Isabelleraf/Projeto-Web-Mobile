"use client"

import Link from "next/link";
import Style from "./page.module.css";
import {useState, useEffect} from 'react'

export default function Notificacoes(){
    const [notificacoes, setNotificacoes] = useState(null);
    
    useEffect(() =>{
        async function fetchNotificacoes() {
            try {
                const response = await fetch('/api/notificacao');
                const data = await response.json();
                setNotificacoes(data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchNotificacoes()
    }, [])

    return (
        <>
             
            <header className={Style.notificacoes}>
                <h1>Notificações</h1>
            </header>

            <nav className={Style.botoes}>
                <Link className={Style.voltar} href="/">Voltar</Link>
            </nav>
            

            {notificacoes && notificacoes.map((notificacao) => (
                <div key={notificacao.id} className={Style.notificacao}>
                    <strong>{notificacao.titulo}</strong>: {notificacao.descricao}
                </div>
            ))}

           
        </>
    );
}
