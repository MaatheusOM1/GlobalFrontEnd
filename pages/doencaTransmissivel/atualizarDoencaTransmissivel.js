import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function AtualizarDoenca() {
  const [idControle, setIdControle] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idProblema, setIdProblema] = useState('');
  const [tratamentoRecomendado, setTratamentoRecomendado] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const doenca = {
      idControle,
      idPaciente,
      idProblema,
      tratamentoRecomendado,
      observacoes,
    };

    try {
      const response = await fetch(`http://localhost:8080/controleDoencasTransmissiveis/atualizar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doenca),
      });

      if (response.ok) {
        alert('Doença transmissivel atualizada com sucesso!');
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
      setErroAtualizacao('Erro ao atualizar doenca transmissivel. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Atualizar Doença Transmissível</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          ID do Controle:
          <input type="text" value={idControle} onChange={(e) => setIdControle(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          ID do Paciente:
          <input type="text" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          ID do Problema:
          <input type="text" value={idProblema} onChange={(e) => setIdProblema(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Tratamento Recomendado:
          <input type="text" value={tratamentoRecomendado} onChange={(e) => setTratamentoRecomendado(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Observações:
          <input type="text" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Atualizar</button>
        <br />
        <li className={styles.button}><Link href="homeDoencaTransmissivel" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
