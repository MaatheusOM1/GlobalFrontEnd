import Link from 'next/link';
import styles from '../../styles/HomePaginas.module.css';
import '../../styles/global.css';

const HomeConsulta = () => {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Consultas</h1>
      <nav className={styles.nav}>
        <h1 className={styles.h1}>Aqui você pode monitorar suas consultas! <br /> Cadastre, atualize, delete e liste para seu próprio controle!</h1>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="cadastroConsulta" className={styles.a}>Cadastro de Consultas</Link>
          </li>
          <li className={styles.li}>
            <Link href="atualizarConsulta" className={styles.a}>Atualização de Consultas</Link>
          </li>
          <li className={styles.li}>
            <Link href="deletarConsulta" className={styles.a}>Deletar Consultas</Link>
          </li>
          <li className={styles.li}>
            <Link href="listarConsulta" className={styles.a}>Listar Consultas</Link>
          </li>
        </ul>
      </nav>
      <li className={styles.li}><Link href="../home" className={styles.a}>Voltar</Link></li>
    </div>
  );
};

export default HomeConsulta;
