import {Link, useSearchParams} from "react-router-dom";

import classNames from 'classnames';
import React, { useState } from 'react';
import { useUsers } from '../store/UsersContext';

type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
}

function getSearchWith(params: Params, search?: string | URLSearchParams) {
  const newParams = new URLSearchParams(search); // если не пустой перелдаем все значения  из URLSearchParams

  for (const [key, value] of Object.entries(params)) {  //перебираем все ключи изначения новых params:
    if (value === null) {// если ноль удаляем
      newParams.delete(key);
    } else if (Array.isArray(value)) {// если массив то удаляем
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()))//делае апенд чтоб добавить несколько значений
    } else {
      newParams.set(key, value.toString());// во всех других случяях устанавлтваем одно значение
    }
  }
  return newParams.toString();// возвращяем  строку
}
export const PostFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //useSearchParams() беретс с адреса
  const users = useUsers();

  const query = searchParams.get('query') || '';
  const letters = searchParams.getAll('letters') || '';
  const userId = +(searchParams.get('userId') || 0);

  // const [query, setQuery] = useState('');
  // const [userId, setUserId] = useState(0);
  // const [letters, setLetters] = useState<string[]>([]);

  //  создали в 3 уроке
  function setSearchWith(params: any) {
    // const newParams = new URLSearchParams(searchParams);

    const search = getSearchWith(params, searchParams)
    // setSearchParams(newParams);
    setSearchParams(search);
  }

  function handlePageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    // setUserId(+event.target.value);

    //  измиенили в 3 уроке
    // const params = new URLSearchParams(searchParams); //сохранили преыдущие параметры
    //params.set('userId', event.target.value); // и ддобавли с ключем х
    //setSearchParams(params);

    setSearchWith({userId: +event.target.value || null});
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    // setQuery(event.target.value);
    // setSearchParams(`?query=${event.target.value}`);

    //  измиенили в 3 уроке
    // const params = new URLSearchParams(searchParams); //сохранили преыдущие параметры
    // params.set('query', event.target.value); // и ддобавли с ключем х
    // setSearchParams(params);

    setSearchWith({query: +event.target.value || null});
  }

  function toggleLetter(ch: string) {
    // setLetters(currentLetters => currentLetters.includes(ch)
    //   ? currentLetters.filter(letter => letter !== ch)
    //   : [...currentLetters, ch]
    // );
    //const params = new URLSearchParams(searchParams); //сохранили преыдущие параметры
    // проверяем есть ли эта буква
    const newLetters = letters.includes(ch)
       ? letters.filter(letter => letter !== ch)// оставляем только буквы те которые не совпавют с текущими
        // если нет добавляем
        : [...letters, ch];// иначе все буквы плюс текущяя

    //  измиенили в 3 уроке
    //params.delete('letters'); // удаляем все значения
    // перебираем вс ебуквы и обавляем их в адрес
    //newLetters.forEach(letter => params.append('letters', letter)); //  ch   текущий символ
    //setSearchParams(params);// в конце записываем в адрес

    setSearchWith({letters: newLetters});
  }

  function clearLetters() {
    // setLetters([]);

    //  измиенили в 3 уроке
    //  const params = new URLSearchParams(searchParams); //сохранили преыдущие параметры
    //  params.delete('letters'); // и ддобавли с ключем х
    //   setSearchParams(params);

    setSearchWith({ letters: null });
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
          <Link
            key={letter}
            to={{ search: getSearchWith({
                letters: letters.includes(letter)
                    ? letters.filter(ch => letter !== ch)
                    : [...letters, letter]
            }, searchParams),
            }}
            // onClick={() => toggleLetter(letter)}
            className={classNames('button', {
              'is-info': letters.includes(letter),
            })}
          >
            {letter}
          </Link>
        ))}

        <Link
            to={{ search: getSearchWith({letters: null}, searchParams) }}
          onClick={clearLetters}
          className="button"
          // disabled={letters.length === 0}
        >
          Clear
        </Link>
      </div>
    </div>
  )
};
