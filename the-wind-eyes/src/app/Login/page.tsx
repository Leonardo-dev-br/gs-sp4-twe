'use client';
import React, { useState } from 'react';
import { Button } from "../components/Button/Button";
import Input from "../components/Input/Input";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../Context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');


  const avenidaPaulistaCep = '01311-000'; 
  const handleLogin = async () => {
  
    if (email === 'exemplo@fiap.com' && senha === 'senha123') {
      try {
        const user = {
          nome: 'Exemplo',        
          cep: avenidaPaulistaCep, 
          sobrenome: 'Usuário',   
          email,                   
          dataDeNascimento: '2000-01-01', 
          senha,                  
        };

       
        login(user);
        setError('');
        router.push('/home');
      } catch (error) {
        console.error('Login failed:', error);
        setError('Erro ao tentar fazer login');
      }
    } else {
      setError('Nome de usuário ou senha incorretos');
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.loginCenter}>
        <div className={styles.divForms}>
          <h1 className={styles.tittle}>ENTRAR</h1>

          <Input 
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input 
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className={styles.buttonsDiv}>
            <Button
              label="Entrar"
              backgroundColor="#51E54F"
              width="10rem"
              height="3rem"
              onClick={() => handleLogin()} 
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <span className={styles.span}>OU</span>
            <Button
              label="Cadastrar"
              backgroundColor="#195C18"
              width="10rem"
              height="3rem"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
