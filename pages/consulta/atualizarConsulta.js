import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function AtualizarAlimentacao() {
  const [idConsulta, setidConsulta] = useState('');
  const [idPaciente, setIdPaciente] = useState('');
  const [idMedico, setidMedico] = useState('');
  const [dataConsulta, setdataConsulta] = useState('');
  const [tipoConsulta, settipoConsulta] = useState('');
  const [observacoes, setobservacoes] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const consulta = {
      idConsulta,
      idPaciente,
      idMedico,
      tipoConsulta,
      observacoes,
      dataConsulta: new Date(dataConsulta),
    };

    try {
      const response = await fetch('http://localhost:8080/consultas/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consulta),
      });

      if (response.ok) {
        alert('Consulta atualizada com sucesso!');
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
        setErroAtualizacao(`Erro ao atualizar Consulta: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setErroAtualizacao('Erro ao atualizar Consulta. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Atualizar Consulta</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          ID da Consulta que deseja atualizar:
          <input type="text" value={idConsulta} onChange={(e) => setidConsulta(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          ID do Paciente:
          <input type="text" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          ID do Médico:
          <input type="text" value={idMedico} onChange={(e) => setidMedico(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Tipo de Consulta:
          <input type="text" value={tipoConsulta} onChange={(e) => settipoConsulta(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Observações:
          <input type="text" value={observacoes} onChange={(e) => setobservacoes(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Data da Consulta:
          <input type="date" value={dataConsulta} onChange={(e) => setdataConsulta(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Atualizar</button>
        <br />
        <li className={styles.button}><Link href="homeConsulta" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
