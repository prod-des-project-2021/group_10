import React, { useContext, useState, useEffect } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from "react-router-dom"
import MenuAppBar from "./MenuAppBar"
import { ToolbarContext } from "../contexts/ToolbarContext"

export default function Profile() {
    const { currentUser, sendVerificationEmail } = useAuth()
    const { setText } = useContext(ToolbarContext)
    const [isEmail, setIsEmail] = useState(null)
    const [error, setError] = useState(null)
    const [button, setButton] = useState(true)

    setText("Profile")

    function handleEmail(currentUser) {
        if(currentUser != null && currentUser.email != null){
            return currentUser.email
        } else {
            return ""
        }
    }

    function handleEmailSubmit() {
        sendVerificationEmail()
        setButton(false)
    }

    //for email validation, could be done better but does the job for now
    useEffect(() => {
        try {
            if(currentUser != null && currentUser.email != null) {
                if(currentUser.emailVerified === false) {
                    setIsEmail(false)
                } else {
                    setIsEmail(true)
                }
            }
        } catch(e) {
            setError(e)
        }
    }, [currentUser])

    return (
        <>
            <MenuAppBar/>
            <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Profile</h2>
                        <strong>Email: </strong> {handleEmail(currentUser)}
                        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                            Update profile
                        </Link>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {!button && <Alert variant="success">Verification sent</Alert>}
                        {(!isEmail && button) && <Button className="btn btn-primary w-100 mt-3" onClick={handleEmailSubmit}>
                            Resend verification email
                        </Button>}
                    </Card.Body>
                </Card>
        </>
    )
}
