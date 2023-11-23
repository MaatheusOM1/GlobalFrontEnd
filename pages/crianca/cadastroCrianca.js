import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function CadastroCrianca() {
  const [nomeCrianca, setNomeCrianca] = useState('');
  const [idade, setIdade] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const crianca = {
      nomeCrianca,
      idade: parseInt(idade, 10),
    };

    try {
      const response = await fetch('http://localhost:8080/crianca/cadastrarCrianca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crianca),
      });

      if (response.ok) {
        alert('Criança cadastrada com sucesso!');
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
        setErroAtualizacao(`Erro ao cadastrar Criança: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao cadastrar Criança. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Cadastro de Criança</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nome da Criança:
          <input type="text" value={nomeCrianca} onChange={(e) => setNomeCrianca(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Idade da Criança:
          <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Cadastrar</button>
        <br />
        <li className={styles.button}><Link href="homeCrianca" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
