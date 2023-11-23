import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function ListarConsultas() {
  const [consultas, setConsultas] = useState([]);

  const obterConsultas = async () => {
    try {
      const response = await fetch('http://localhost:8080/consultas/listar');

      if (response.ok) {
        const data = await response.json();
        setConsultas(data);
      } else {
        console.error('Erro ao obter a lista de consultas');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      alert('Erro ao obter a lista de consultas');
    }
  };

  useEffect(() => {
    obterConsultas();
  }, []);

  return (
    <div>
      <h1>Listar Consultas</h1>
      <ul>
        {consultas.map((consulta) => (
          <li key={consulta.idConsulta}>
            {`ID: ${consulta.idConsulta}, ID Paciente: ${consulta.idPaciente}, ID Médico: ${consulta.idMedico}, Data Consulta: ${consulta.dataConsulta}, Tipo Consulta: ${consulta.tipoConsulta}, Observações: ${consulta.observacoes}`}
          </li>
        ))}
      </ul>
      <br />
      <li className={styles.button}><Link href="homeConsulta" className={styles.a}>Voltar</Link></li>
    </div>
  );
}
