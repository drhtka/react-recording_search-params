import { Link, Outlet, NavLink, useParams, useLocation } from 'react-router-dom';
import classNames from 'classnames';

// #region isActive
interface Options {
  isActive: boolean
}

const getLinkClass = ({ isActive }: Options) => classNames('navbar-item', {
  'is-active': isActive,
});

const getLinkStyle = ({ isActive }: Options) => ({
  color: isActive ? 'red' : '',
});
// #endregion

export const App = () => {
  const { userId } = useParams();
  const { pathname, search } = useLocation();

  return <>
    <nav className="navbar is-light px-3">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src="/logo.svg" alt="MA" className="logo" />
        </Link>

        <NavLink to="/" className={getLinkClass} style={getLinkStyle}>
          Home
        </NavLink>

        <NavLink to="/users" end className={getLinkClass} style={getLinkStyle}>
          Users
        </NavLink>

        <NavLink to="/posts" className={getLinkClass} style={getLinkStyle}>
          Posts
        </NavLink>

        {userId && (
          <NavLink to={`/users/${userId}/posts`} className={getLinkClass} style={getLinkStyle}>
            User {userId} Posts
          </NavLink>
        )}
      </div>
    </nav>

    <div className="section">
      <p className="title is-5 has-text-info">
        {pathname}
      </p>

      <p className="title is-6">
        {search && search.replaceAll('&', ' &')}
      </p>

      <Outlet />
    </div>
  </>;
}
