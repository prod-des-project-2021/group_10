import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link } from "react-router-dom"
import MenuAppBar from "./MenuAppBar"
import { ToolbarContext } from "../contexts/ToolbarContext"

export default function Profile() {
    const { currentUser } = useAuth()
    const { setText } = useContext(ToolbarContext)

    setText("Profile")

    function handleEmail(currentUser) {
        if(currentUser != null && currentUser.email != null){
            return currentUser.email
        } else {
            return ""
        }
    }

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
                    </Card.Body>
                </Card>
        </>
    )
}
