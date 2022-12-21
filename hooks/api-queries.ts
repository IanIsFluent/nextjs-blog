import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

function useApiQueries(apiBaseUrl: string) {
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
      queryKey: ['acAll'],
      queryFn: async () => {
        setActiveQueryName('acAll');
        var res = await fetch(`${apiBaseUrl}/autocomplete/all?q=${acAllValue}`);
        return res.json();
      },
    }),
    acCourses: useQuery({
      queryKey: ['acCourses'],
      queryFn: async () => {
        setActiveQueryName('acCourses');
        var res = await fetch(
          `${apiBaseUrl}/autocomplete/courses?q=${acCoursesValue}`
        );
        return res.json();
      },
    }),
    acInstitutions: useQuery({
      queryKey: ['acInstitutions'],
      queryFn: async () => {
        setActiveQueryName('acInstitutions');
        var res = await fetch(
          `${apiBaseUrl}/autocomplete/institutions?q=${acInstitutionsValue}`
        );
        return res.json();
      },
    }),
    acSubjects: useQuery({
      queryKey: ['acSubjects'],
      queryFn: async () => {
        setActiveQueryName('acSubjects');
        var res = await fetch(
          `${apiBaseUrl}/autocomplete/subjects?q=${acSubjectsValue}`
        );
        return res.json();
      },
    }),
    acPlaces: useQuery({
      queryKey: ['acPlaces'],
      queryFn: async () => {
        setActiveQueryName('acPlaces');
        var res = await fetch(
          `${apiBaseUrl}/autocomplete/places?q=${acPlacesValue}`
        );
        return res.json();
      },
    }),
    instDetails: useQuery({
      queryKey: ['instDetails'],
      queryFn: async () => {
        setActiveQueryName('instDetails');
        var res = await fetch(`${apiBaseUrl}/institutions/${instDetailsValue}`);
        if (res.status === 404) {
          return 'not found';
        }
        return res.json();
      },
    }),
    instSearch: useQuery({
      queryKey: ['instSearch'],
      queryFn: async () => {
        setActiveQueryName('instSearch');
        var res = await fetch(`${apiBaseUrl}/institutions?${instSearchValue}`);
        return res.json();
      },
    }),
    placesList: useQuery({
      queryKey: ['placesList'],
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

  return {
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
  };
}
export { useApiQueries };
