'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import axios from 'axios';

const fetchData = async (idUsuario) => {
  try {
      const response = await axios.get(`http://localhost:8080/usuario/${idUsuario}`);
      console.log(response.data);
  } catch (error) {
      console.error('Erro ao Buscar usuário :', error);
  }
};

const quizData = [
    {
      question: "Qual é a principal fonte de energia renovável no Brasil?",
      options: ["Energia solar", "Energia eólica", "Hidrelétrica"],
      correct: 2, // Hidrelétrica
    },
    {
      question: "Qual destas opções NÃO é uma fonte de energia renovável?",
      options: ["Carvão mineral", "Energia solar", "Biomassa"],
      correct: 0, // Carvão mineral
    },
    {
      question: "O que é energia solar?",
      options: [
        "Energia gerada pelo movimento das marés",
        "Energia obtida a partir da luz do sol",
        "Energia obtida a partir do calor subterrâneo",
      ],
      correct: 1, // Energia obtida a partir da luz do sol
    },
    {
      question: "Qual ação reduz o consumo de energia em casa?",
      options: [
        "Deixar aparelhos em stand-by",
        "Utilizar lâmpadas LED",
        "Deixar luzes acesas o dia todo",
      ],
      correct: 1, // Utilizar lâmpadas LED
    },
    {
      question: "O que é energia eólica?",
      options: [
        "Energia obtida a partir de resíduos orgânicos",
        "Energia gerada pelo movimento do vento",
        "Energia obtida a partir de combustíveis fósseis",
      ],
      correct: 1, // Energia gerada pelo movimento do vento
    },
    {
      question: "Qual é um benefício do uso de energia renovável?",
      options: [
        "Reduz a poluição ambiental",
        "Aumenta a dependência de combustíveis fósseis",
        "Causa maior desmatamento",
      ],
      correct: 0, // Reduz a poluição ambiental
    },
    {
      question: "Como podemos contribuir para a redução de resíduos plásticos?",
      options: [
        "Usando sacolas reutilizáveis",
        "Jogando plásticos no lixo comum",
        "Comprando mais itens embalados em plástico",
      ],
      correct: 0, // Usando sacolas reutilizáveis
    },
    {
      question: "Qual das seguintes práticas ajuda a economizar água?",
      options: [
        "Tomar banhos longos",
        "Reutilizar a água da máquina de lavar para limpar o quintal",
        "Deixar a torneira aberta enquanto escova os dentes",
      ],
      correct: 1, // Reutilizar a água da máquina de lavar para limpar o quintal
    },
    {
      question: "Qual é a principal vantagem da energia solar?",
      options: [
        "É inesgotável e não emite gases poluentes",
        "É a fonte de energia mais barata do mundo",
        "Pode ser utilizada apenas em regiões frias",
      ],
      correct: 0, // É inesgotável e não emite gases poluentes
    },
    {
      question: "Como o plantio de árvores ajuda o meio ambiente?",
      options: [
        "Aumentando a emissão de gases poluentes",
        "Absorvendo dióxido de carbono e liberando oxigênio",
        "Acelerando o aquecimento global",
      ],
      correct: 1, // Absorvendo dióxido de carbono e liberando oxigênio
    },
  ];
  

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    console.log("Pergunta atual:", currentQuestionIndex);
  }, [currentQuestionIndex]);

  const handleAnswer = (index: number) => {
    console.log("Resposta selecionada:", index);

    if (index === quizData[currentQuestionIndex].correct) {
      setScore((prevScore) => prevScore + 1);
      console.log("Resposta correta! Nova pontuação:", score + 1);
    } else {
      console.log("Resposta incorreta!");
    }

    const nextQuestionIndex = currentQuestionIndex + 1;

    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  return (
        <main className={styles.main}>
    <div>
      {showScore ? (
        <div className={styles.scoreSection}>
          <h1>Quiz Finalizado!</h1>
          <p>
            Você acertou {score} de {quizData.length} perguntas.
          </p>
        </div>
      ) : (
        <div className={styles.questionSection}>
          <h1 className={styles.questionTitle}>
            {quizData[currentQuestionIndex].question}
          </h1>
          <div className={styles.options}>
            {quizData[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={styles.optionButton}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
        </main>
  );
}
