import { useQuery } from '@tanstack/react-query';

function Results({ activeQueryName }) {
  const { data, isLoading, isFetching } = useQuery([activeQueryName], {
    enabled: false,
  });

  return (
    <div>
      <h3>
        Results{activeQueryName && (isLoading || isFetching) && ' Loading...'}
      </h3>
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
