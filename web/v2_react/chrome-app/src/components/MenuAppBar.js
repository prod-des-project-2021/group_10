import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowCircleLeft from '@mui/icons-material/ArrowCircleLeft';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useNavigate } from "react-router-dom"
import Alert from 'react'
import { ToolbarContext } from "../contexts/ToolbarContext"
import { useAuth } from "../contexts/AuthContext"

export default function MenuAppBar() {
    const [auth, setAuth] = React.useState(true);
    const [error, setError] = React.useState('');
    const navigate = useNavigate()
    const { text } = React.useContext(ToolbarContext)
    const { logout, currentUser } = useAuth()
  
    const handleChange = async(event) => {
      setAuth(event.target.checked);
      await logout()
    };
    
    function handleProfile() {
      try {
        setError("")
        navigate("/profile")
      } catch(e) {
          setError(e.toString)
      }
    }

    function handleDashboard() {
      try {
        currentUser.reload()
        setError("")
        navigate(-1)
      } catch(e) {
          setError(e.toString)
      }
    }

    function handleUpdate() {
      try {
        setError("")
        navigate(-1)
      } catch(e) {
          setError(e.toString)
      }
    }

    function handleRoutes(text) {
      switch(text) {
        case "Photos":
          return <AccountCircle onClick={handleProfile}/>
        case "Profile":
          return <ArrowCircleLeft onClick={handleDashboard}/>
        case "Update your profile":
          return <ArrowCircleLeft onClick={handleUpdate}/>
        default:
          return <AccountCircle onClick={handleProfile}/>
      }
    }

    return (
      <Box sx={{ flexGrow: 1 }}>
        {error && <Alert variant="danger">{error}</Alert>}
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={auth}
                onChange={handleChange}
                aria-label="login switch"
              />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position="static">
          <Toolbar>
            <Typography id="selection" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {text}
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="false"
                  color="inherit"
                >
                  {handleRoutes(text)}
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
