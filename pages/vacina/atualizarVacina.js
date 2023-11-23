import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function AtualizacaoVacina() {
  const [idVacina, setIdVacina] = useState('');
  const [nomeVacina, setNomeVacina] = useState('');
  const [descricao, setDescricao] = useState('');
  const [idadeRecomendada, setIdadeRecomendada] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const vacina = {
      nomeVacina,
      descricao,
      idadeRecomendada: parseInt(idadeRecomendada),
    };

    try {
      const response = await fetch(`http://localhost:8080/vacina/atualizarVacina/${idVacina}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vacina),
      });

      if (response.ok) {
        alert('Vacina atualizada com sucesso!');
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
        setErroAtualizacao(`Erro ao atualizar Vacina: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao atualizar Vacina. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Atualização de Vacina</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          ID da Vacina:
          <input type="number" value={idVacina} onChange={(e) => setIdVacina(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Nome da Vacina:
          <input type="text" value={nomeVacina} onChange={(e) => setNomeVacina(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Descrição:
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Idade Recomendada:
          <input type="number" value={idadeRecomendada} onChange={(e) => setIdadeRecomendada(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Atualizar</button>
        <br />
        <li className={styles.button}><Link href="homeVacina" className={styles.a}>Voltar</Link>
        </li>
      </form>
    </div>
  );
  
}
