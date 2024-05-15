import Link from "next/link";
import Style from "./menu.module.css"

export default function Menu(){
    return(
        <nav className={Style.menu}>
            <ul>
                <li> <Link href="/paginaMapa">Mapa</Link> </li>
                <li> <Link href="/paginaNotificacoes">Notificações</Link> </li>
                <li> <Link href="/paginaQuiz">Quiz</Link> </li>
                <li> <Link href="/paginaDenuncias">Denúncias</Link> </li>
            </ul>
        </nav>
    );
}
