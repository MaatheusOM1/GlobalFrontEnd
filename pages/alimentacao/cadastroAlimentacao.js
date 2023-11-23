import { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Forms.module.css';

export default function CadastroAlimentacao() {
    const [idPaciente, setIdPaciente] = useState('');
    const [dataRefeicao, setDataRefeicao] = useState('');
    const [descricaoRefeicao, setDescricaoRefeicao] = useState('');
    const [calorias, setCalorias] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const alimentacao = {
        idPaciente,
        dataRefeicao: new Date(dataRefeicao),
        descricaoRefeicao,
        calorias: parseInt(calorias),
        };

        try {
        const response = await fetch('http://localhost:8080/alimentacao/cadastrar', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(alimentacao),
        });

        if (response.ok) {
            alert('Alimentação cadastrada com sucesso!');
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
            setErroAtualizacao(`Erro ao cadastrar alimentação: ${errorMessage}`);
          }
        } catch (error) {
          console.error('Erro ao enviar dados para o servidor:', error);
          setErroAtualizacao('Erro ao cadastrar alimentação. Tente novamente mais tarde.');
        }
    };

    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Cadastro de Alimentação</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            ID do Paciente:
            <input type="text" value={idPaciente} onChange={(e) => setIdPaciente(e.target.value)} required className={styles.input} />
          </label>
          <br />
          <label className={styles.label}>
            Data da Refeição:
            <input type="date" value={dataRefeicao} onChange={(e) => setDataRefeicao(e.target.value)} required className={styles.input} />
          </label>
          <br />
          <label className={styles.label}>
            Descrição da Refeição:
            <input type="text" value={descricaoRefeicao} onChange={(e) => setDescricaoRefeicao(e.target.value)} required className={styles.input} />
          </label>
          <br />
          <label className={styles.label}>
            Calorias:
            <input type="number" value={calorias} onChange={(e) => setCalorias(e.target.value)} required className={styles.input} />
          </label>
          <br />
          <button type="submit" className={styles.button}>Cadastrar</button>
          <br />
          <li className={styles.button}><Link href="homeAlimentacao" className={styles.a}>Voltar</Link></li>
        </form>
      </div>
    );
    
    }