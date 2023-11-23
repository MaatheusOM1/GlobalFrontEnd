import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Forms.module.css';

export default function CadastroMedico() {
  const [nomeMedico, setNomeMedico] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const medico = {
      nomeMedico,
      especialidade,
      email,
      senha,
    };

    try {
      const response = await fetch('http://localhost:8080/medicos/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medico),
      });

      if (response.ok) {
        alert('Médico cadastrado com sucesso!');
      } else if (response.status === 401) {
        window.location.href = '/errors/erro401';
      } else if (response.status === 404) {
        window.location.href = '/errors/erro404';
      } else if (response.status === 500) {
        window.location.href = '/errors/erro500';
      } else if (response.status === 400) {
        window.location.href = '/errors/erro400';
      } else {
        const errorMessage = await response.text();
        setErroAtualizacao(`Erro: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao cadastrar paciente. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Cadastro de Médico</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nome do Médico:
          <input type="text" value={nomeMedico} onChange={(e) => setNomeMedico(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Especialidade:
          <input type="text" value={especialidade} onChange={(e) => setEspecialidade(e.target.value)} required className={styles.input} />
        </label>
        <br />
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
        <button type="submit" className={styles.button}>Cadastrar</button>
      </form>
      <br />
      <li className={styles.button}><Link href="home" className={styles.a}>Voltar</Link></li>
    </div>
  );
  
}
