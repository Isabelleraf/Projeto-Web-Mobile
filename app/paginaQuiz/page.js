import Link from "next/link";
import Menu from "../components/menu";

export default function Quiz(){
    return (
        <>
            <Menu/>
            <h1>Quiz</h1>
            <Link href="/">Voltar</Link>
        </>
    );
}
