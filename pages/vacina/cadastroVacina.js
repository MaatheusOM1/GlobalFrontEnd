import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function CadastroVacina() {
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
      const response = await fetch('http://localhost:8080/vacina/cadastrarVacina', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vacina),
      });

      if (response.ok) {
        alert('Vacina cadastrada com sucesso!');
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
      setErroAtualizacao('Erro ao cadastrar vacina. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Cadastro de Vacina</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <button type="submit" className={styles.button}>Cadastrar</button>
        <br />
        <li className={styles.button}><Link href="homeVacina" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
