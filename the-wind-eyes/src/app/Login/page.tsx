import { Button } from "../components/Button/Button";
import styles from "./page.module.css";

export default function Login() {
  return (
    <>
      <main>
        <div className={styles.mainBackground}></div>

        <div className={styles.divBack}>
          <section className={styles.loginCenter}>
            <div className={styles.divForms}>
              <h1 className={styles.tittle}>ENTRAR</h1>
              <input
                type="text"
                name=""
                id="email "
                className={styles.input}
                placeholder="Email"
              />
              <input
                type="password"
                className={styles.input}
                placeholder="Senha"
              />

              <div className={styles.buttonsDiv}>
                <Button
                  label="Entrar"
                  backgroundColor="#51E54F"
                  width="20rem"
                  height="3rem"
                />
                <span>OU</span>
                <Button
                  label="Cadastrar"
                  backgroundColor="#195C18"
                  width="20rem"
                  height="3rem"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}