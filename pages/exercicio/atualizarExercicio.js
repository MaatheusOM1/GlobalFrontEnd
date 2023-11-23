import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function AtualizarAlimentacao() {
  const [idExercicio, setidExercicio] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [dataExercicio, setdataExercicio] = useState('');
  const [tipoExercicio, settipoExercicio] = useState('');
  const [duracaoEmMinutos, setduracaoEmMinutos] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const exercicio = {
      idExercicio,
      idPaciente,
      dataExercicio: new Date(dataExercicio),
      tipoExercicio,
      duracaoEmMinutos,
    };

    try {
      const response = await fetch('http://localhost:8080/exercicios/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercicio),
      });

      if (response.ok) {
        alert('Exercicio atualizada com sucesso!');
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
        setErroAtualizacao(`Erro ao atualizar exercicio: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao exercicio alimentação. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Atualizar Exercicio</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          ID da Exercicio que deseja atualizar:
          <input type="text" value={idExercicio} onChange={(e) => setidExercicio(e.target.value)} required className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          ID do Paciente:
          <input type="text" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} required className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          Tipo exercicio:
          <input type="text" value={tipoExercicio} onChange={(e) => settipoExercicio(e.target.value)} required className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          Duração em Minutos:
          <input type="text" value={duracaoEmMinutos} onChange={(e) => setduracaoEmMinutos(e.target.value)} required className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          Data Exercicio:
          <input type="date" value={dataExercicio} onChange={(e) => setdataExercicio(e.target.value)} required className={styles.input}
          />
        </label>
        <br />
        <button type="submit" className={styles.button}>Atualizar</button>
        <br />
        <li className={styles.button}><Link href="homeExercicio" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
