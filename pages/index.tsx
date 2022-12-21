import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useMemo, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { Autocomplete } from '../components/autocomplete';
import { useApiQueries } from '../hooks/api-queries';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
      retry: false,
    },
  },
});

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
    const propelWebUrl = 'https://become-propel-preview.azurewebsites.net';
    const apiBaseUrl = `${propelWebUrl}/api/v1`;
    const {
      acAllValue,
      setAcAllValue,
      acCoursesValue,
      setAcCoursesValue,
      acInstitutionsValue,
      setAcInstitutionsValue,
      acSubjectsValue,
      setAcSubjectsValue,
      acPlacesValue,
      setAcPlacesValue,
      instDetailsValue,
      setInstDetailsValue,
      instSearchValue,
      setInstSearchValue,
      queries,
      resultText,
    } = useApiQueries(apiBaseUrl);

    return (
      <main>
        <h1 className={styles.title}>
          <a href={`${propelWebUrl}/swagger`} target="_blank">
            Propel API
          </a>{' '}
          Examples
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Autocomplete</h3>
            <Autocomplete
              label="All"
              update={queries.acAll.refetch}
              value={acAllValue}
              setValue={setAcAllValue}
            />
            <Autocomplete
              label="Courses"
              update={queries.acCourses.refetch}
              value={acCoursesValue}
              setValue={setAcCoursesValue}
            />
            <Autocomplete
              label="Institutions"
              update={queries.acInstitutions.refetch}
              value={acInstitutionsValue}
              setValue={setAcInstitutionsValue}
            />
            <Autocomplete
              label="Subjects"
              update={queries.acSubjects.refetch}
              value={acSubjectsValue}
              setValue={setAcSubjectsValue}
            />
            <Autocomplete
              label="Places"
              update={queries.acPlaces.refetch}
              value={acPlacesValue}
              setValue={setAcPlacesValue}
            />
          </div>

          <div className={styles.card}>
            <h3>Institutions</h3>
            <div>
              <label
                style={{
                  display: 'inline-block',
                  width: '5em',
                  marginRight: '.5em',
                }}
              >
                Details
              </label>
              <input
                type="text"
                style={{
                  marginRight: '.5em',
                  maxWidth: '12em',
                }}
                value={instDetailsValue}
                onChange={(e) => setInstDetailsValue(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  queries.instDetails.refetch();
                }}
              >
                Send
              </button>
            </div>
            <div>
              <label
                style={{
                  display: 'inline-block',
                  width: '5em',
                  marginRight: '.5em',
                }}
              >
                Search
              </label>

              <textarea
                rows={3}
                style={{
                  marginRight: '.5em',
                  maxWidth: '12em',
                }}
                value={instSearchValue}
                onChange={(e) => setInstSearchValue(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  queries.instSearch.refetch();
                }}
              >
                Send
              </button>
            </div>
          </div>

          <div className={styles.card}>
            <h3>Places</h3>
            <div>
              <label
                style={{
                  display: 'inline-block',
                  width: '5em',
                  marginRight: '.5em',
                }}
              >
                List
              </label>
              <button
                type="button"
                onClick={() => {
                  queries.placesList.refetch();
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div>
          <h3>Results</h3>
          <textarea
            rows={20}
            readOnly={true}
            style={{ width: '100%' }}
            value={resultText}
          />
        </div>
      </main>
    );
  }
}
