import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function ListarDoencas() {
  const [doencas, setDoencas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/controleDoencasTransmissiveis/listar');
        const data = await response.json();

        if (response.ok) {
          setDoencas(data);
        } else {
          alert('Erro ao obter lista de doenças');
        }
      } catch (error) {
        console.error('Erro ao enviar dados para o servidor:', error);
        alert('Erro ao obter lista de doenças');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Listar Doenças Transmissíveis</h1>
      <ul>
        {doencas.map((doenca) => (
          <li key={doenca.idControle}>
            ID: {doenca.idControle}, ID Paciente: {doenca.idPaciente}, ID Problema: {doenca.idProblema}, Tratamento Recomedado: {doenca.tratamentoRecomendado}, Observações: {doenca.observacoes}
          </li>
        ))}
      </ul>
      <br />
      <li className={styles.button}><Link href="homeDoencaTransmissivel" className={styles.a}>Voltar</Link></li>
    </div>
  );
}
