import Link from "next/link";
import Style from "./page.module.css";


export default function Quiz(){
    return (
        <>
            <header className={Style.quiz}>
                <h1>Quiz</h1>
            </header>
            
            <Link href="/">Voltar</Link>
        </>
    );
}
