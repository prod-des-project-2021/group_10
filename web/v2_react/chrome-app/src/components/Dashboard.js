import React, { useState, useContext } from 'react'
import { Card } from 'react-bootstrap'
import UploadForm from "./UploadForm"
import ImageGrid from "./ImageGrid"
import Modal from "./Modal"
import MenuAppBar from "./MenuAppBar"
import { ToolbarContext } from "../contexts/ToolbarContext"

export default function Dashboard() {
    const [selectedImg, setSelectedImg] = useState(null)
    const [selectedText, setSelectedText] = useState(null)
    const { setText } = useContext(ToolbarContext)

    setText("Photos")

    return (
        <>
            <MenuAppBar/>
            <Card className="card">
                <Card.Body>
                    <h2 className="text-center mb-4">Upload</h2>
                    <UploadForm/>
                </Card.Body>
            </Card>
            <ImageGrid setSelectedImg={setSelectedImg} setSelectedText={setSelectedText}/>
            { selectedImg && <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} setSelectedText={setSelectedText} selectedText={selectedText}/> }
        </>
    )
}
