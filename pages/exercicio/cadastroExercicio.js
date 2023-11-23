import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function CadastroExercicio() {
  const [idPaciente, setIdPaciente] = useState('');
  const [dataExercicio, setDataExercicio] = useState('');
  const [tipoExercicio, setTipoExercicio] = useState('');
  const [duracaoEmMinutos, setDuracaoEmMinutos] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const exercicio = {
      idPaciente,
      dataExercicio: new Date(dataExercicio),
      tipoExercicio,
      duracaoEmMinutos: parseInt(duracaoEmMinutos, 10),
    };

    try {
      const response = await fetch('http://localhost:8080/exercicios/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercicio),
      });

      if (response.ok) {
        alert('Exercicio cadastrado com sucesso!');
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
      setErroAtualizacao('Erro ao cadastrar exercicio. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Cadastro de Exercício</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          ID do Paciente:
          <input type="text" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} required className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          Data do Exercício:
          <input type="date" value={dataExercicio} onChange={(e) => setDataExercicio(e.target.value)} required className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          Tipo de Exercício:
          <input type="text" value={tipoExercicio} onChange={(e) => setTipoExercicio(e.target.value)} required className={styles.input}
          />
        </label>
        <br />
        <label className={styles.label}>
          Duração em Minutos:
          <input type="number" value={duracaoEmMinutos} onChange={(e) => setDuracaoEmMinutos(e.target.value)} required className={styles.input}
          />
        </label>
        <br />
        <button type="submit" className={styles.button}>Cadastrar</button>
        <br />
        <li className={styles.button}><Link href="homeExercicio" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
