import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { API_BASE_URL } from '../util/constants';

function InstitutionSearch({ setActiveQueryName }) {
  const [value, setValue] = useState('subject=art&\nplacename=hull&\nradius=5');
  const { refetch } = useQuery({
    queryKey: ['instSearch'],
    queryFn: async () => {
      setActiveQueryName('instSearch');
      var res = await fetch(`${API_BASE_URL}/institutions/?q=${value}`);
      return res.json();
    },
  });

  return (
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          refetch();
        }}
      >
        Send
      </button>
    </div>
  );
}
export { InstitutionSearch };
