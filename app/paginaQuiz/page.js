"use client"

import Link from "next/link";
import Style from "./page.module.css";
import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation';


export default function Quiz(){
    const router = useRouter();

    let perguntas = {
        0 : {
            title: "1- Qual a principal causa de acidentes de trânsito no Brasil?",
            respostas: ["Excesso de velocidade", 
                        "Dirigir sob a influência de álcool", 
                        "Dirigir com sono", 
                        "Todas as alternativas acima"],
            respostaCorreta: ["Todas as alternativas acima"]
        },

        1 : {
            title: "2- O que fazer se você se deparar com um acidente de trânsito?",
            respostas: ["Parar o veículo em local seguro e prestar socorro às vítimas", "Ligar para o 190 ou 192", "Sinalizar o local do acidente", "Todas as alternativas acima"],
            respostaCorreta: ["Todas as alternativas acima"]
        },

        2 : {
            title: "3- Qual a importância de usar a faixa de pedestres?",
            respostas: ["É mais rápido", "É mais seguro", "É a lei", "Todas as alternativas acima"],
            respostaCorreta: ["Todas as alternativas acima"]
        },

        3 : {
            title: "4- Quais são os principais perigos de andar de bicicleta na rua?",
            respostas: ["Carros que não respeitam os ciclistas", "Falta de infraestrutura cicloviária", "Buracos na pista", "Todas as alternativas acima"],
            respostaCorreta: ["Todas as alternativas acima"]
        },

        4 : {
            title: "5- Qual a principal causa de acidentes de trânsito no Brasil?",
            respostas: ["Não respeitar as leis de trânsito", "Use o celular enquanto dirige", "Dirija sob a influência de álcool ou drogas", "Mantenha seu veículo em boas condições de manutenção"],
            respostaCorreta: ["Não respeitar as leis de trânsito"]
        }
    }

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [Message, setMessage] = useState(false);
    
    function handleCheckboxChange(index) {
        setSelectedAnswer(index);
    }

    useEffect(() => {
        if (Message === "Teste Concluido!") {
            setTimeout(() => {
                router.push('/');
            }, 1000);
        }
    }, [Message, router]);


    function avancarPergunta() {

        const perguntaAtual = perguntas[currentQuestion];
        if (perguntaAtual.respostaCorreta.toString() === perguntas[currentQuestion].respostas[selectedAnswer].toString()) {
            setShowMessage(true);
            setMessage("Resposta Correta!")
            setTimeout(() => {
                setShowMessage(false);
                setSelectedAnswer(null);

                (() => {
                    if (currentQuestion >= Object.entries(perguntas).length -1 ) {
                        setShowMessage(true);
                        setMessage("Teste Concluido!")
                        return console.log("maximo!")
                    }
                    setCurrentQuestion(prevIndex => prevIndex + 1);

                })()
            }, 1000); 
        } else {  
            setShowMessage(true);
            setMessage("Resposta Incorreta!")
            setTimeout(() => {
                setShowMessage(false);
                setSelectedAnswer(null);
            }, 1000); 
        }

    }

    return (
        <>
            <header className={Style.quiz}>
                <h1>Quiz</h1>
            </header>

            <nav className={Style.botoes}>
                <Link className={Style.voltar} href="/">Voltar</Link>
            </nav>
            
            <div className={Style.quizDiv}>
                {Object.entries(perguntas).map(([index, pergunta], idx) => (
                    <div id={"perg_" + index} className={idx === currentQuestion ? '' : Style.hide}>
                        <p>{pergunta.title}</p>
                        {Object.entries(pergunta.respostas).map(([inx, res], idx) =>{
                            return (
                                <div key={inx}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={selectedAnswer === inx}
                                            onChange={() => handleCheckboxChange(inx)}
                                            disabled={showMessage} 
                                        />
                                        {res}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                ))}

                <button className={Style.botaoQuiz} onClick={avancarPergunta} disabled={selectedAnswer === null || showMessage}>
                    Proximo
                </button>
                {showMessage && <p>{Message}</p>}
            </div>
            
        </>
    );
}
