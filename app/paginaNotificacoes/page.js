import Link from "next/link";
import Menu from "../components/menu";

export default function Notificacoes(){
    return (
        <>
            <Menu/>
            <h1>Notificações</h1>
            <Link href="/">Voltar</Link>
        </>
    );
}
