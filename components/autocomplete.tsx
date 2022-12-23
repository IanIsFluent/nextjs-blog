import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useStore } from '../state/store';
import { API_BASE_URL } from '../util/constants';

function Autocomplete({ label }: { label: string }) {
  const [value, setValue] = useState('art');
  const { setQueryName } = useStore();
  const queryName = label.toLowerCase();
  const { refetch } = useQuery({
    queryKey: [queryName],
    queryFn: async () => {
      setQueryName(queryName);
      var res = await fetch(
        `${API_BASE_URL}/autocomplete/${queryName}?q=${value}`
      );
      return res.json();
    },
  });

  return (
    <div>
      <label
        htmlFor="all"
        style={{
          display: 'inline-block',
          width: '5em',
          marginRight: '.5em',
        }}
      >
        {label}
      </label>
      <input
        type="text"
        id="all"
        name="all"
        style={{
          marginRight: '.5em',
          maxWidth: '12em',
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button type="button" onClick={() => refetch()}>
        Send
      </button>
    </div>
  );
}

export { Autocomplete };
