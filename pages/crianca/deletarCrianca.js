import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function DeletarCrianca() {
  const [idCrianca, setidCrianca] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/crianca/deletarCrianca/${idCrianca}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Criança deletada com sucesso!');
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
        setErroAtualizacao(`Erro ao deletar Criança: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao deletar Criança. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Deletar Crianca</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          ID da Crianca:
          <input type="text" value={idCrianca} onChange={(e) => setidCrianca(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Deletar</button>
        <br />
        <li className={styles.button}><Link href="homeCrianca" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );  
}
