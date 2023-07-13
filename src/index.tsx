import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; 

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import './index.scss';

import { Root } from './Root';
import { AuthProvider } from './store/AuthContext';
import { UsersProvider } from './store/UsersContext';
import { PostsProvider } from './store/PostsContext';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(
  <Router>
    <AuthProvider>
      <UsersProvider>
        <PostsProvider>
          <Root />
        </PostsProvider>
      </UsersProvider>
    </AuthProvider>
  </Router>
);
