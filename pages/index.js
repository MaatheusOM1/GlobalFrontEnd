import { useState } from 'react';
import styles from '../styles/Forms.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dadosLogin = {
      email,
      senha,
    };

    try {
      const response = await fetch('http://localhost:8080/pacientes/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosLogin),
      });

      if (response.status === 200) {
        const userData = await response.json();
        sessionStorage.setItem('userData', JSON.stringify(userData));

        window.location.href = '/home';
      } else if (response.status === 401) {
        window.location.href = 'errors/erro401'
      } else if (response.status === 404) {
        window.location.href = 'errors/erro404'
      } else if (response.status === 500) {
        window.location.href = 'errors/erro500'
      } else {
        setErroLogin('Erro ao tentar fazer login. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroLogin('Erro ao tentar fazer login. Tente novamente mais tarde.');
    }
  };

  const handleCadastroClick = () => {
    window.location.href = '/cadastroPaciente';
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Entrar</button>
      </form>
        <button onClick={handleCadastroClick} className={styles.buttoncadastro}>Cadastrar</button>
      {erroLogin && <p style={{ color: 'red' }}>{erroLogin}</p>}
    </div>
  );
  
}
