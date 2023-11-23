import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function AtualizarAlimentacao() {
  const [idAlimentacao, setIdAlimentacao] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [descricaoRefeicao, setDescricaoRefeicao] = useState('');
  const [calorias, setCalorias] = useState('');
  const [dataRefeicao, setDataRefeicao] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const alimentacao = {
      idAlimentacao,
      idPaciente,
      descricaoRefeicao,
      calorias: parseInt(calorias),
      dataRefeicao: new Date(dataRefeicao),
    };

    try {
      const response = await fetch('http://localhost:8080/alimentacao/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alimentacao),
      });

      if (response.ok) {
        alert('Alimentação atualizada com sucesso!');
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
        setErroAtualizacao(`Erro ao atualizar alimentação: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao atualizar alimentação. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Atualizar Alimentação</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          ID da Alimentação que deseja atualizar:
          <input type="text" value={idAlimentacao} onChange={(e) => setIdAlimentacao(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label>
          ID do Paciente:
          <input type="text" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label>
          Descrição da Refeição:
          <input type="text" value={descricaoRefeicao} onChange={(e) => setDescricaoRefeicao(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label>
          Calorias:
          <input type="number" value={calorias} onChange={(e) => setCalorias(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label>
          Data da Refeição:
          <input type="date" value={dataRefeicao} onChange={(e) => setDataRefeicao(e.target.value)} required className={styles.input}
          />
        </label>
        <br />
        <button type="submit" className={styles.button}>Atualizar</button>
        <br />
        <li className={styles.button}><Link href="homeAlimentacao" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
}
