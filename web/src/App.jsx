import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Error from './pages/Error';
import User from "./pages/User";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Post from "./pages/Post";
import { UserContext } from "./contexts/UserContext";
import { useState } from "react";
import Search from "./pages/Search";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
function App() {

  const [user, setUser] = useState(null)

  const routes = createBrowserRouter([
    { path: "/", element: <Home />, errorElement: <Error /> },
    { path: "/login", element: <Login />, errorElement: <Error /> },
    { path: "/register", element: <Register />, errorElement: <Error /> },
    { path: "/profile", element: <Profile />, errorElement: <Error /> },
    { path: "/search", element: <Search />, errorElement: <Error /> },
    { path: "/add", element: <CreatePost />, errorElement: <Error /> },
    { path: "/users/:id", element: <User />, errorElement: <Error /> },
    { path: "/edit/:id", element: <EditPost />, errorElement: <Error /> },
    { path: "/:id", element: <Post />, errorElement: <Error /> },
  ])
  const theme = extendTheme({
    fonts: {
      body: `'fira-sans', san-serif`,
      heading: `'hind', arial`
    }
  })

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={[user, setUser]}>
        <RouterProvider router={routes} />
      </UserContext.Provider>
    </ChakraProvider>


  )
}

export default App
