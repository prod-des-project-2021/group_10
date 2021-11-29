import React, { useState, useContext } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import {  useNavigate } from "react-router-dom"
import UploadForm from "./UploadForm"
import ImageGrid from "./ImageGrid"
import Modal from "./Modal"
import MenuAppBar from "./MenuAppBar"
import { ToolbarContext } from "../contexts/ToolbarContext"

export default function Dashboard() {
    const [error, setError] = useState("")
    const { logout } = useAuth()
    const [selectedImg, setSelectedImg] = useState(null)
    const navigate = useNavigate()
    const { setText } = useContext(ToolbarContext)

    setText("Photos")

    async function handleLogout() {
        setError('')

        try{
            await logout()
            navigate("/login")
        } catch{
            setError("Failed to log out")
        }
    }

    return (
        <>
            <MenuAppBar/>
            <Card className="card">
                <Card.Body>
                    <h2 className="text-center mb-4">Upload</h2>
                    <UploadForm/>
                </Card.Body>
            </Card>
            <ImageGrid setSelectedImg={setSelectedImg}/>
            { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg}/> }
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>Log out</Button>
            </div>
        </>
    )
}
