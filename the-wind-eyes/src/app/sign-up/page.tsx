'use client';
import { useState } from "react";
import { Button } from "../components/Button/Button";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from 'axios';
import Input from '../components/Input/Input';

export default function SignUp() {
  const router = useRouter();

  const [birthdayDate, setBirthdayDate] = useState("");
  const [usuarioCep, setCep] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [senha, setSenha] = useState("");


  const validateFields = async () => {
    if (!nome.trim()) {
      alert("Por favor, preencha o nome.");
      return false;
    }

    if (!sobrenome.trim()) {
      alert("Por favor, preencha o sobrenome.");
      return false;
    }

    if (!signUpEmail.trim() || !/\S+@\S+\.\S+/.test(signUpEmail)) {
      alert("Por favor, preencha um email válido.");
      return false;
    }


    const cepRegex = /^\d{5}-?\d{3}$/;
    if (!usuarioCep.trim() || !cepRegex.test(usuarioCep)) {
      alert("Por favor, preencha o CEP corretamente (com ou sem traço).");
      return false;
    }

    if (!senha.trim() || senha.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    const isValid = await validateFields();
    if (!isValid) {
      return;
    }

    const user = {
      nome,
      sobrenome,
      usuarioEmail: signUpEmail,
      dataNascimento: birthdayDate,
      usuarioCep,
      senha,
    };

    console.log(typeof user);
    console.log(user)
    
    try {
      const response = await axios.post(
        'http://localhost:8080/usuario',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000',
          },
         body: JSON.stringify(user),
        }
      );
      console.log('Usuário cadastrado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.response || error);
    }
    
  };

  return (
    <main className={styles.main}>
      <section className={styles.signupCenter}>
        <div className={styles.divForms}>
          <h1 className={styles.tittle}>CADASTRAR</h1>
          <Input
            type="text"
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
            value={nome}
          />

          <Input
            type="text"
            placeholder="Sobrenome"
            onChange={(e) => setSobrenome(e.target.value)}
            value={sobrenome}
          />

          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setSignUpEmail(e.target.value)}
            value={signUpEmail}
          />
          <Input
            type="text"
            placeholder="Data de nascimento (DD/MM/AAAA)"
            onChange={(e) => setBirthdayDate(e.target.value)}
            value={birthdayDate}
          />
          <Input
            type="text"
            placeholder="CEP"
            onChange={(e) => setCep(e.target.value)}
            value={usuarioCep}
          />
          <Input
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
          />

          <div className={styles.buttonsDiv}>
            <Button
              label="Cadastrar"
              backgroundColor="#51E54F"
              width="20rem"
              height="3rem"
              onClick={handleSignUp}
            />
            <span className={styles.span}>OU</span>
            <Button
              label="Entrar"
              backgroundColor="#195C18"
              width="20rem"
              height="3rem"
              onClick={() => router.push('/login')}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
