import { useSearchParams } from "react-router-dom";

import classNames from 'classnames';
import React, { useState } from 'react';
import { useUsers } from '../store/UsersContext';

export const PostFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //useSearchParams() беретс с адреса
  const users = useUsers();

  const query = searchParams.get('query') || '';
  const letters = searchParams.getAll('letters') || '';
  const userId = +(searchParams.get('userId') || 0);

  // const [query, setQuery] = useState('');
  // const [userId, setUserId] = useState(0);
  // const [letters, setLetters] = useState<string[]>([]);

  function handlePageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    // setUserId(+event.target.value);

    const params = new URLSearchParams(searchParams); //сохранили преыдущие параметры
    params.set('userId', event.target.value); // и ддобавли с ключем х
    setSearchParams(params);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    // setQuery(event.target.value);
    // setSearchParams(`?query=${event.target.value}`);
    const params = new URLSearchParams(searchParams); //сохранили преыдущие параметры
    params.set('query', event.target.value); // и ддобавли с ключем х
    setSearchParams(params);

  }

  function toggleLetter(ch: string) {
    // setLetters(currentLetters => currentLetters.includes(ch)
    //   ? currentLetters.filter(letter => letter !== ch)
    //   : [...currentLetters, ch]
    // );
    const params = new URLSearchParams(searchParams); //сохранили преыдущие параметры
    const newLetters = letters.includes(ch) // проверяем есть ли эта буква
        // если есть удаляем
    ? letters.filter(letter => letter !== ch)// оставляем только буквы те которые не совпавют с текущими
        // если нет добавляем
        : [...letters, ch];// иначе все буквы плюс текущяя

    params.delete('letters'); // удаляем все значения
    // перебираем вс ебуквы и обавляем их в адрес
    newLetters.forEach(letter => params.append('letters', letter)); //  ch   текущий символ
    setSearchParams(params);// в конце записываем в адрес
  }

  function clearLetters() {
    // setLetters([]);
    const params = new URLSearchParams(searchParams); //сохранили преыдущие параметры
    params.delete('letters'); // и ддобавли с ключем х
    setSearchParams(params);
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
