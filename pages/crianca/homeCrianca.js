import Link from 'next/link';
import styles from '../../styles/HomePaginas.module.css';
import '../../styles/global.css';


const HomeCrianca = () => {
  return (
    <div className={styles.div}>
      <h1 className={styles.h1}>Filhos</h1>
      <nav className={styles.nav}>
        <h1 className={styles.h1}>Aqui você pode monitorar seus filhos! <br /> Cadastre, atualize, delete e liste para seu próprio controle!</h1>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <Link href="cadastroCrianca" className={styles.a}>Cadastro de Crianças</Link>
          </li>
          <li className={styles.li}>
            <Link href="atualizarCrianca" className={styles.a}>Atualização de Crianças</Link>
          </li>
          <li className={styles.li}>
            <Link href="deletarCrianca" className={styles.a}>Deletar Crianças</Link>
          </li>
          <li className={styles.li}>
            <Link href="listarCrianca" className={styles.a}>Listar Crianças</Link>
          </li>
        </ul>
      </nav>
      <li className={styles.li}><Link href="../home" className={styles.a}>Voltar</Link></li>
    </div>
  );
};

export default HomeCrianca;
