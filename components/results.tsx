import { useQuery } from '@tanstack/react-query';
import { useStore } from '../state/store';

function Results() {
  const queryName = useStore((state) => state.queryName);
  const { data, isLoading, isFetching } = useQuery([queryName], {
    enabled: false,
  });

  return (
    <div>
      <h3>Results{queryName && (isLoading || isFetching) && ' Loading...'}</h3>
      <textarea
        rows={20}
        readOnly={true}
        style={{
          width: '100%',
        }}
        value={JSON.stringify(data, null, 2)}
      />
    </div>
  );
}

export { Results };
