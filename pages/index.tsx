import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Propel API Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );

  function Main() {
    const [acAllValue, setAcAllValue] = useState('art');
    const { isLoading, isError, data, isSuccess, error, refetch } = useQuery({
      queryKey: ['acAll'],
      enabled: false,
      retry: false,
      queryFn: async () => {
        var res = await fetch(
          'https://become-propel-preview.azurewebsites.net/api/v1/autocomplete/all?q=' +
            acAllValue
        );
        return res.json();
      },
    });

    return (
      <main>
        <h1 className={styles.title}>
          Read <Link href="/posts/first-post">my first page!</Link>
        </h1>

        <p className={styles.description}>
          Using propel API at
          https://become-propel-preview.azurewebsites.net/swagger.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Autocomplete</h3>
            <label
              htmlFor="all"
              style={{
                marginRight: '.5em',
              }}
            >
              All
            </label>
            <input
              type="text"
              id="all"
              name="all"
              style={{
                marginRight: '.5em',
              }}
              value={acAllValue}
              onChange={(e) => setAcAllValue(e.target.value)}
            ></input>
            <button type="button" onClick={() => refetch()}>
              Send
            </button>
          </div>
          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
        <h3>Results</h3>
        <div
          style={{
            width: '100%',
            backgroundColor: 'lightyellow',
            padding: '1em',
            maxHeight: '50vh',
            overflow: 'auto',
          }}
        >
          <>
            {isError && <div>Error: {(error as any)?.message}</div>}
            {isLoading && <div>Loading...</div>}
            {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
          </>
        </div>
      </main>
    );
  }
}
