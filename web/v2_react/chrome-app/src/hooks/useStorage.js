import { useState, useEffect } from 'react'
import { storage, firestore, timestamp } from "../firebase.js"
import { useAuth } from '../contexts/AuthContext'
import { createWorker } from "tesseract.js"

export default function useStorage(file, lang) {

    const [progress, setProgress] = useState(0)
    const [error, setError] = useState('')
    const [url, setUrl] = useState('')
    const { currentUser } = useAuth()


    useEffect(() => {
        const storageRef = storage.ref(currentUser.uid + '/' + file.name)
        const collectionRef = firestore.collection(currentUser.uid)
        const listRef = storage.ref(currentUser.uid)
        const fileArray = []

        listRef.listAll()
        .then( async (res) => {
            res.items.forEach((itemRef) => {
                fileArray.push(itemRef)
            })
            for (let files of fileArray) {
                if(files.name === file.name) {
                    setError("Image exists")
                    console.log(error)
                }
            }
        })
        storageRef.put(file).on('state_changed', (snap) => {
            let prc = (snap.bytesTransferred / snap.totalBytes) * 100
            setProgress(prc)
        }, (err) => {
            setError(err)
        }, async () => {
            const url = await storageRef.getDownloadURL()
            const createdAt = timestamp()
            const worker = createWorker({
                logger: m => console.log(m)
            })
            await worker.load();
            await worker.loadLanguage(lang);
            await worker.initialize(lang);
            const { data: { text } } = await worker.recognize(url);
            console.log(text);
            await worker.terminate();
            collectionRef.add({ url, createdAt, text })
            setUrl(url)
        })
    }, [file, currentUser, lang, error])

    return { progress, url, error }
}
