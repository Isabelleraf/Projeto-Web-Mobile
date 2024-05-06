import Link from "next/link";
import Style from "./page.module.css";


export default function Notificacoes(){
    return (
        <>
            <header className={Style.notificacoes}>
                <h1>Notificações</h1>
            </header>
            
            <nav className={Style.voltar}>
                <Link href="/">Voltar</Link>
            </nav>
        </>
    );
}
