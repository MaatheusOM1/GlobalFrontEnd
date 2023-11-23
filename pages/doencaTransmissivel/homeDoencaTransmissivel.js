import Link from 'next/link';
import styles from '../../styles/HomePaginas.module.css';
import '../../styles/global.css';

const HomeDoencaTransmissivel = () => {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Doenças Transmissiveis</h1>
      <nav className={styles.nav}>
        <h1 className={styles.h1}>Aqui você pode monitorar suas doenças transmissíveis! <br /> Cadastre, atualize, delete e liste para seu próprio controle!</h1>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="cadastroDoencaTransmissivel" className={styles.a}>Cadastro de Doenças Transmissiveis</Link>
          </li>
          <li className={styles.li}>
            <Link href="atualizarDoencaTransmissivel" className={styles.a}>Atualização de Doenças Transmissiveis</Link>
          </li>
          <li className={styles.li}>
            <Link href="deletarDoencaTransmissivel" className={styles.a}>Deletar Doenças Transmissiveis</Link>
          </li>
          <li className={styles.li}>
            <Link href="listarDoencaTransmissivel" className={styles.a}>Listar Doenças Transmissiveis</Link>
          </li>
        </ul>
      </nav>
      <li className={styles.li}><Link href="../home" className={styles.a}>Voltar</Link></li>
    </div>
  );
};

export default HomeDoencaTransmissivel;
