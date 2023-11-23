import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function CadastroConsulta() {
  const [idPaciente, setIdPaciente] = useState('');
  const [idMedico, setIdMedico] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const consulta = {
      idPaciente,
      idMedico,
      dataConsulta: new Date(dataConsulta),
      tipoConsulta,
      observacoes,
    };

    try {
      const response = await fetch('http://localhost:8080/consultas/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(consulta),
      });

      if (response.ok) {
        alert('Consulta cadastrada com sucesso!');
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
      setErroAtualizacao('Erro ao cadastrar consulta. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Cadastro de Consulta</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          ID do Paciente:
          <input type="text" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          ID do Médico:
          <input type="text" value={idMedico} onChange={(e) => setIdMedico(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Data da Consulta:
          <input type="date" value={dataConsulta} onChange={(e) => setDataConsulta(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Tipo de Consulta:
          <input type="text" value={tipoConsulta} onChange={(e) => setTipoConsulta(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <label className={styles.label}>
          Observações:
          <input type="text" value={observacoes} onChange={(e) => setObservacoes(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Cadastrar Consulta</button>
        <br />
        <li className={styles.button}><Link href="homeConsulta" className={styles.a}>Voltar</Link></li>
      </form>
    </div>
  );
  
}
