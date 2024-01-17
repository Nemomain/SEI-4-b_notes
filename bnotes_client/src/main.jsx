import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Components
import App from './App.jsx'
import Homepage from './components/Homepage.jsx'
import LibraryList from './components/LibraryList.jsx'
import SingleBook from './components/SingleBook.jsx'
import SingleLibrary from './components/SingleLibrary.jsx'
import BookSearch from './components/BookSearch.jsx'
import About from './components/About.jsx'

//loaders
import { getSingleLibrary } from './utils/loaders/libraryLoader.js'
import { googleCall } from './utils/helpers/googleHelper.js'
import { getBookSingle } from './utils/helpers/bookHelpers.js'

//Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: '/about/',
        element: <About />
      },
      {
        path: '/:userId/',
        element: <LibraryList />
      },
      {
        path: '/:userId/book/:bookId',
        element: <SingleBook />,
        loader: async ({ params }) => getBookSingle(params.bookId)
      },
      {
        path: '/:userId/library/:libraryId',
        element: <SingleLibrary />,
        loader: async ({ params }) => getSingleLibrary(params.libraryId)
      },
      {
        path: '/:userId/library/:libraryId/:search',
        element: <BookSearch />,
        loader: async ({ params }) => googleCall(params.libraryId, params.search),
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
