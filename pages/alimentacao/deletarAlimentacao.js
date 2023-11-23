import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function DeletarAlimentacao() {
  const [idAlimentacao, setIdAlimentacao] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/alimentacao/deletar/${idAlimentacao}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Alimentação deletada com sucesso!');
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
        setErroAtualizacao(`Erro ao deletar alimentação: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao deletar alimentação. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Deletar Alimentação</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          ID da Alimentação:
          <input type="text" value={idAlimentacao} onChange={(e) => setIdAlimentacao(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Deletar</button>
        <br />
        <li className={styles.button}><Link href="homeAlimentacao" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
