import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function DeletarDoenca() {
  const [idControle, setIdControle] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/controleDoencasTransmissiveis/deletar/${idControle}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Doença transmissivel deletada com sucesso!');
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
        setErroAtualizacao(`Erro ao: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao deletar doenca transmissivel. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Deletar Doença Transmissível</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          ID do Controle:
          <input type="text" value={idControle} onChange={(e) => setIdControle(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Deletar</button>
        <br />
        <li className={styles.button}><Link href="homeDoencaTransmissivel" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
