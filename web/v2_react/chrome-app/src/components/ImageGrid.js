import React from 'react'
import useFirestore from '../hooks/useFirestore'
import { useAuth } from '../contexts/AuthContext'

export default function ImageGrid() {
    const { currentUser } = useAuth()
    const { docs } = useFirestore(currentUser.uid)

    return (
        <div className="img-grid">
            { docs && docs.map(doc => (
            <div className="img-wrap" key={doc.id}>
                <img src={doc.url} alt="uploaded pic"/>
            </div>))}
        </div>
    )
}
