import Link from "next/link";
import Style from "./page.module.css";

export default function Denuncias(){
    return (
        <>  
            <header className={Style.denuncias}>
                <h1>Denúncias</h1>
            </header>  

            <Link href="/">Voltar</Link>
        </>
    );
}
