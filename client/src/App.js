import { BrowserRouter } from 'react-router-dom'
import { useRouter } from './routes'
import { AuthContext } from './context/auth.context'
import { useAuth } from './hooks/auth.hook'
import { useHttp } from './hooks/http.hook'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import './App.css'
import 'materialize-css'




function App() {
  const {accesToken, refreshToken, login, logout, check, userId, isActivated, userName, ready, cLoading} = useAuth()
  const {loading} = useHttp()
  const isAuthenticated = !!accesToken
  const routes = useRouter(isAuthenticated, isActivated)

  if(loading){
    return <Loader />
  }else if(!ready){
    return <Loader />
  }

  if(cLoading){
    return <Loader />
  }

  return (
    <AuthContext.Provider value={{
      accesToken, refreshToken, login, logout, check, userId, isAuthenticated, isActivated, userName
    }}>
      <div>
        <BrowserRouter>
          {isAuthenticated && <Navbar />}
          {routes}
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  )
}

export default App;
