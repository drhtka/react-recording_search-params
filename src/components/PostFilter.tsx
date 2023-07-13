import classNames from 'classnames';
import React, { useState } from 'react';
import { useUsers } from '../store/UsersContext';

export const PostFilter = () => {
  const users = useUsers();
  const [query, setQuery] = useState('');
  const [userId, setUserId] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  
  function handlePageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  function toggleLetter(ch: string) {
    setLetters(currentLetters => currentLetters.includes(ch)
      ? currentLetters.filter(letter => letter !== ch)
      : [...currentLetters, ch]
    );
  }

  function clearLetters() {
    setLetters([]);
  }

  return (
    <div className="block">
      <div className="field is-grouped">
        <div className="select">
          <select value={userId} onChange={handlePageChange}>
            <option value="0">All users</option>

            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <input
          type="search"
          className="input"
          placeholder="Search by title"
          value={query}
          onChange={handleQueryChange}
        />
      </div>

      <div className="buttons">
        {'aeoui'.split('').map(letter => (
          <button
            key={letter}
            onClick={() => toggleLetter(letter)}
            className={classNames('button', {
              'is-info': letters.includes(letter),
            })}
          >
            {letter}
          </button>
        ))}

        <button
          onClick={clearLetters}
          className="button"
          disabled={letters.length === 0}
        >
          Clear
        </button>
      </div>
    </div>
  )
};
