import { UsersList } from '../components/UserList';
import { useUsers } from '../store/UsersContext';

export const UsersPage = () => {
  const users = useUsers();

  return <>
    <h1 className="title">Users Page</h1>

    <UsersList users={users} />
  </>
};
