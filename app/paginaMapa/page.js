import Link from "next/link";
import Style from "./page.module.css";
import Image from 'next/image'
 

export default function Mapa(){
    return (
        <>
            <header className={Style.mapa}>
                <h1>Mapa</h1>
            </header>

            <nav className={Style.botoes}>
                <Link className={Style.botaoVoltar} href="/">Voltar</Link>
            </nav>
            
            <h2>Áreas de grande risco de acidentes:</h2>
            <div>
                <Image
                    src="/images/AreasDeRisco.png"
                    width={500}
                    height={300}
                />
            </div>

            <h2>Medidas de Segurança:</h2>
            <div>
                <Image
                    src="/images/MedidasSeguranca.jpeg"
                    width={300}
                    height={300}
                />
            </div>

        </>
    );
}
