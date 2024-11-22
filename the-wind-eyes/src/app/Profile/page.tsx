'use client';
import styles from "./page.module.css";
import Image from "next/image";
import userIcon from "../assets/userIcon.png";
import { useEffect, useState } from "react";
import { ContentParagraph } from "../components/ContentParagraph/ContentParagraph";

type UserType = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  dataDeNascimento: string;
  cep: string;
};

type CepType = {
  neighborhood: string;
};

export default function Profile() {
  const [user, setUser] = useState<UserType | null>(null);
  const [cep, setCep] = useState<CepType | null>(null);
  const userId = 1; 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/usuario/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error(`Erro ao buscar usuário: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    // Busca o CEP
    const searchCep = async () => {
      try {
        if (user?.cep) {
          const response = await fetch(
            `https://brasilapi.com.br/api/cep/v2/${user.cep}`
          );
          const data = await response.json();
          setCep(data);
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    };

    if (user?.cep) {
      searchCep();
    }
  }, [user?.cep]);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.profileSection}>
        <div className={styles.userDiv}>
          <div className={styles.imageDiv}>
            <Image
              src={userIcon}
              alt={"User icon"}
              width={150}
              height={150}
            />
            <ContentParagraph color="white" fontSize="1.5rem">
              {user.nome} {user.sobrenome}
            </ContentParagraph>
          </div>
          <div className={styles.infoDiv}>
            <p className={styles.p}>Data de nascimento: {user.dataDeNascimento}</p>
            <p className={styles.p}>
              Bairro: {cep?.neighborhood || "Bairro não encontrado"}
            </p>
            <p className={styles.p}>Email: {user.email}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
