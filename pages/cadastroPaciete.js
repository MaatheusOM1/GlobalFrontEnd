import { useState } from 'react';
import styles from '../styles/Forms.module.css';
 
export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
 
  const handleSubmit = async (event) => {
    event.preventDefault();
 
    const paciente = {
      nomePaciente: nome,
      dataNascimento: new Date(dataNascimento),
      email,
      senha,
      cpf,
    };
 
    try {
      const response = await fetch('http://localhost:8080/pacientes/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paciente),
      });
 
      if (response.ok) {
        alert('Paciente cadastrado com sucesso!');
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
      setErroAtualizacao('Erro ao cadastrat paciente. Tente novamente mais tarde.');
    }
  };
 
  const voltar = () => {
    window.location.href = '/';
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Cadastro de Paciente</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Data de Nascimento:
          <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required className={styles.input} />
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
        <label className={styles.label}>
          CPF:
          <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>
          Cadastrar
        </button>
      </form>
      <button onClick={voltar} className={styles.buttoncadastro}>
        Voltar
      </button>
    </div>
  );
  
}
