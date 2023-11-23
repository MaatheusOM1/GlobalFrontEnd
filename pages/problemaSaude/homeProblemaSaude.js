import Link from 'next/link';
import styles from '../../styles/HomePaginas.module.css';
import '../../styles/global.css';

const HomeProblemaSaude = () => {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Problemas de Saude</h1>
      <nav className={styles.nav}>
        <h1 className={styles.h1}>Aqui você pode monitorar seus problemas de saúde! <br /> Cadastre, atualize, delete e liste para seu próprio controle!</h1>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="cadastroProblemaSaude" className={styles.a}>Cadastro de Problemas de Saude</Link>
          </li>
          <li className={styles.li}>
            <Link href="atualizarProblemaSaude" className={styles.a}>Atualização de Problemas de Saude</Link>
          </li>
          <li className={styles.li}>
            <Link href="deletarProblemaSaude" className={styles.a}>Deletar Problemas de Saude</Link>
          </li>
          <li className={styles.li}>
            <Link href="listarProblemaSaude" className={styles.a}>Listar Problemas de Saude</Link>
          </li>
        </ul>
      </nav>
      <li className={styles.li}><Link href="../home" className={styles.a}>Voltar</Link></li>
    </div>
  );
};

export default HomeProblemaSaude;
