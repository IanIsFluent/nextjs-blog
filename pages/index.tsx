import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useMemo, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { Autocomplete } from '../components/autocomplete';

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

    const [activeQueryName, setActiveQueryName] = useState('');

    const [acAllValue, setAcAllValue] = useState('art');
    const [acCoursesValue, setAcCoursesValue] = useState('art');
    const [acInstitutionsValue, setAcInstitutionsValue] = useState('art');
    const [acSubjectsValue, setAcSubjectsValue] = useState('art');
    const [acPlacesValue, setAcPlacesValue] = useState('art');

    const [instDetailsValue, setInstDetailsValue] = useState(
      'the-university-of-cambridge'
    );
    const [instSearchValue, setInstSearchValue] = useState(
      'subject=art&\nplacename=hull&\nradius=5'
    );

    const queries = {
      acAll: useQuery({
        queryFn: async () => {
          setActiveQueryName('acAll');
          var res = await fetch(
            `${apiBaseUrl}/autocomplete/all?q=${acAllValue}`
          );
          return res.json();
        },
      }),
      acCourses: useQuery({
        queryFn: async () => {
          setActiveQueryName('acCourses');
          var res = await fetch(
            `${apiBaseUrl}/autocomplete/courses?q=${acCoursesValue}`
          );
          return res.json();
        },
      }),
      acInstitutions: useQuery({
        queryFn: async () => {
          setActiveQueryName('acInstitutions');
          var res = await fetch(
            `${apiBaseUrl}/autocomplete/institutions?q=${acInstitutionsValue}`
          );
          return res.json();
        },
      }),
      acSubjects: useQuery({
        queryFn: async () => {
          setActiveQueryName('acSubjects');
          var res = await fetch(
            `${apiBaseUrl}/autocomplete/subjects?q=${acSubjectsValue}`
          );
          return res.json();
        },
      }),
      acPlaces: useQuery({
        queryFn: async () => {
          setActiveQueryName('acPlaces');
          var res = await fetch(
            `${apiBaseUrl}/autocomplete/places?q=${acPlacesValue}`
          );
          return res.json();
        },
      }),
      instDetails: useQuery({
        queryFn: async () => {
          setActiveQueryName('instDetails');
          var res = await fetch(
            `${apiBaseUrl}/institutions/${instDetailsValue}`
          );
          if (res.status === 404) {
            return 'not found';
          }
          return res.json();
        },
      }),
      instSearch: useQuery({
        queryFn: async () => {
          setActiveQueryName('instSearch');
          var res = await fetch(
            `${apiBaseUrl}/institutions?${instSearchValue}`
          );
          return res.json();
        },
      }),
      placesList: useQuery({
        queryFn: async () => {
          setActiveQueryName('placesList');
          var res = await fetch(`${apiBaseUrl}/places`);
          return res.json();
        },
      }),
    };
    const latestQuery = queries[activeQueryName];
    const resultText = useMemo(() => {
      if (!latestQuery) {
        return '';
      }
      if (latestQuery.isFetching) {
        return 'Loading...';
      }
      if (latestQuery.isError) {
        return `Error: ${latestQuery.error.message}`;
      }
      if (latestQuery.data) {
        return JSON.stringify(latestQuery.data, null, 2);
      }
      return '';
    }, [
      activeQueryName,
      latestQuery?.isFetching,
      latestQuery?.data,
      latestQuery?.isError,
      latestQuery?.error,
    ]);

    return (
      <main>
        <h1 className={styles.title}>Propel API Examples</h1>

        <p className={styles.description}>
          Using propel API <a href={`${propelWebUrl}/swagger`}>here</a>.
        </p>

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
