import { useState, useEffect } from 'react'
import { storage, firestore, timestamp } from "../firebase.js"
import { useAuth } from '../contexts/AuthContext'

export default function useStorage(file) {

    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')
    const [url, setUrl] = useState('')
    const { currentUser } = useAuth()


    useEffect(() => {
        const storageRef = storage.ref(file.name)
        const collectionRef = firestore.collection(currentUser.uid)

        storageRef.put(file).on('state_changed', (snap) => {
            let prc = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress(prc)
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await storageRef.getDownloadURL()
            const createdAt = timestamp()
            collectionRef.add({ url, createdAt })
            setUrl(url)
        })
    }, [file, currentUser])

    return { progress, url, error }
}
