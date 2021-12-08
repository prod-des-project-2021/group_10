import React, { useEffect } from 'react'
import useStorage from "../hooks/useStorage"
import { motion } from 'framer-motion'


export default function ProgressBar({file, setFile, lang, setError}) {

    const { url, progress, error, recognizeText, isOCR } = useStorage(file, lang)
    console.log(progress, url)

    useEffect(() => {
        if (error) {
            setError(error)
        }
        if(url) {
            setFile(null)
            setError(null)
        }
    }, [url, setFile, setError, error])

    return (
        <>
            <motion.div className="progress-bar" 
                initial={{ width: 0 }}
                animate={{ width: progress + '%'}}>
            </motion.div>
            {isOCR && <div>
                <p>{"Recognizing text: " + recognizeText * 100 + "%"}</p>
            </div>}
        </>
    )
}
