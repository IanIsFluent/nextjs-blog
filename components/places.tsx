import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../util/constants';

function Places({ setActiveQueryName }) {
  const { refetch } = useQuery({
    queryKey: ['places'],
    queryFn: async () => {
      setActiveQueryName('places');
      var res = await fetch(`${API_BASE_URL}/places/`);
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
        List
      </label>
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

export { Places };
