import styles from "./Home.module.css";

const Home = () => (
  <main class={styles.container}>
    <div class={styles.inner}>
      <img class={styles.image} src="/simse.jpg" alt="A picture of Simon Sorensen smiling" />

      <h1 class={styles.name}>Simon Sorensen</h1>
      <p class={styles.location}>Software Engineer in London</p>

      <div class={styles.bio}>
        <p>Ever since I was just a few years old I've known I wanted to work with technology.</p>

        <p>
          Now at the old age of 25, I'm lucky to be spending every single day building cool things
          (and occasionally breaking cool things).
        </p>

        <p>Please have a look around and <a href="/creations">see for yourself.</a></p>
      </div>

      <a href="/simon-sorensen-cv.pdf">CV</a>
    </div>
  </main>
);

export default Home;
