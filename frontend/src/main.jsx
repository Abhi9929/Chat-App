import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './pages/error_page/ErrorPage.jsx';
import Contact, { loader as contactLoader } from './pages/contact/Contact.jsx';
import { loader as userLoader } from './components/Sidebar/Sidebar.jsx';
import Signin from './pages/auth/Signin.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'signin'} />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'signin',
    element: <Signin />
  },
  {
    path: 'account',
    element: <Root />,
    loader: userLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'contacts/:receiverId',
        element: <Contact />,
        loader: contactLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

// const router2 = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Navigate to={'/signin'} />}>
//       <Route path='signin' element={<Signin />} />
//       <Route
//         loader={userLoader}
//         path='account'
//         errorElement={<ErrorPage />}
//         element={<Root />}
//       />
//       <Route
//         path='contacts/:receiverId'
//         element={<Contact />}
//         loader={contactLoader}
//         errorElement={<ErrorPage />}
//       />
//     </Route>
//   )
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
