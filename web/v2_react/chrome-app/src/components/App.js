import React, { useState, useMemo } from "react"
import { Container } from 'react-bootstrap'
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./Dashboard"
import Signup from "./Signup"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Profile from "./Profile"
import Gdpr from "./Gdpr"
import PrivateRoute from "./PrivateRoute"
import { ToolbarContext } from "../contexts/ToolbarContext"

function App() {
  const [text, setText] = useState("Photos")
  const value = useMemo(() => ({ text, setText }), [text, setText])

  return (
    <Container className="d-flex aling-items-center justify-content-center" style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <ToolbarContext.Provider value={value}>
                <Routes>
                    <Route exact path="/" element={<PrivateRoute>
                                                    <Dashboard/>
                                                    </PrivateRoute>}/>
                    <Route exact path="/update-profile" element={<PrivateRoute>
                                                        <UpdateProfile/>
                                                        </PrivateRoute>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                    <Route exact path="/profile" element={<Profile/>}/>
                    <Route path="/gdpr" element={<Gdpr/>}/>
                </Routes>
              </ToolbarContext.Provider>
            </AuthProvider>
          </Router>
        </div>
      </Container>)
}


export default App;
