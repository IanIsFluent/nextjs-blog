import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

function Autocomplete({ label, update, value, setValue }) {
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
      <button type="button" onClick={() => update()}>
        Send
      </button>
    </div>
  );
}

export { Autocomplete };
