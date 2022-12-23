import { useQuery } from '@tanstack/react-query';
import { useStore } from '../state/store';
import { API_BASE_URL } from '../util/constants';

function Places() {
  const { setQueryName } = useStore();
  const { refetch } = useQuery({
    queryKey: ['places'],
    queryFn: async () => {
      setQueryName('places');
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
