import Link from "next/link";
import Style from "./page.module.css";

export default function Mapa(){
    return (
        <>
            <header className={Style.mapa}>
                <h1>Mapa</h1>
            </header>
            
            <h2>Áreas de grande risco de acidentes:</h2>
            
            <h2>Medidas de Segurança:</h2>

                    

            <Link href="/">Voltar</Link>
        </>
    );
}
