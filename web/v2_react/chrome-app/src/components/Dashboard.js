import React, { useState, useContext, useEffect } from 'react'
import { Card, Alert } from 'react-bootstrap'
import UploadForm from "./UploadForm"
import ImageGrid from "./ImageGrid"
import Modal from "./Modal"
import MenuAppBar from "./MenuAppBar"
import { ToolbarContext } from "../contexts/ToolbarContext"
import { useAuth } from "../contexts/AuthContext"

export default function Dashboard() {
    const [selectedImg, setSelectedImg] = useState(null)
    const [selectedText, setSelectedText] = useState(null)
    const [isEmail, setIsEmail] = useState(null)
    const [error, setError] = useState(null)
    const { setText } = useContext(ToolbarContext)
    const { currentUser } = useAuth()

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

    setText("Photos")

    return (
        <>
            <MenuAppBar/>
            <Card className="card">
                <Card.Body>
                    {!isEmail && <Alert variant="danger">Email not verified, please verify your email address</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h2 className="text-center mb-4">Upload</h2>
                    <UploadForm/>
                </Card.Body>
            </Card>
            <ImageGrid setSelectedImg={setSelectedImg} setSelectedText={setSelectedText}/>
            { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} setSelectedText={setSelectedText} selectedText={selectedText}/> }
        </>
    )
}
