"use client"

import Link from "next/link";
import Style from "./page.module.css";
import {useState, useEffect} from 'react'

export default function Denuncias(){
    const [denuncias, setDenuncias] = useState(false);
    
    useEffect(() =>{
        async function fetchDenuncias() {
            try {
                const response = await fetch('/api/denuncia');
                const data = await response.json();
                setDenuncias(data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchDenuncias()
    }, [])

    return (
        <>  
            <header className={Style.denuncias}>
                <h1>Denúncias</h1>
            </header>  
            <div className={Style.botoes}>
                <Link className={Style.botaoVoltar} href="/">Voltar</Link>
                <Link className={Style.botaoNovaDenuncia} href="/paginaNovaDenuncia">+</Link>
            </div>

            {denuncias && denuncias.map((denuncia) => (
                <div key={denuncia.id} className={Style.denuncia}>
                    <strong>{denuncia.local}</strong>: {denuncia.descricao}
                </div>
            ))}

        </>
    );
} 
