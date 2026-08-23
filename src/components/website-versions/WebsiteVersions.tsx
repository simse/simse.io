import styles from "./WebsiteVersions.module.css";

const versions = [
  {
    date: new Date("2019-01-01"),
    title: "Some time in 2019",
    preview: "https://2019.versions.simse.io"
  },
  {
    date: new Date("2021-01-01"),
    title: "Early 2021",
    preview: "https://2021.versions.simse.io"
  },
  {
    date: new Date("2022-01-01"),
    title: "Early 2022",
    preview: "https://early-2022.versions.simse.io"
  }
];

const WebsiteVersions = () => {
  return (
    <main class={styles.container}>
      <header class={styles.header}>
        <a href="/">← Go Back</a>

        <h1 class={styles.title}>Website versions</h1>

        <p class={styles.subtitle}>
          This website has changed so many times. Below is a mostly complete list of all versions,
          including unreleased versions.
        </p>
      </header>

      <ul class={styles.list}>
        {versions.map((version) => (
          <li class={styles.version} key={version.title}>
            <a class={styles.preview} href={version.preview} target="_blank">
              <img src="" class={styles.previewImage} alt="" />

              <h3 class={styles.title}>{version.title}</h3>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default WebsiteVersions;
