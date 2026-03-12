import { ChatPage } from "./pages/ChatPage"
import { HomePage } from "./pages/HomePage"
import { Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import { useClient } from "./store/useClient.js"
import { Navigate } from "react-router-dom"

const App = () => {
  const {name,roomId} = useClient();

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:id" element={name && roomId? <ChatPage />: <Navigate to="/"  />} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App