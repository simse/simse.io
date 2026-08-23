import styles from "./Home.module.css";

const Home = () => (
  <main class={styles.container}>
    <div class={styles.inner}>
      <img class={styles.image} src="/simse.jpg" alt="A picture of Simon Sorensen smiling" />

      <h1 class={styles.name}>Simon Sorensen</h1>
      <p class={styles.location}>Software Engineer in London</p>

      <p class={styles.bio}>Creator of things, maker of things etc.</p>
    </div>
  </main>
);

export default Home;
