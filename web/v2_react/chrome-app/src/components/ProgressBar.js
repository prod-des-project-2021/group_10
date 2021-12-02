import React, { useEffect } from 'react'
import useStorage from "../hooks/useStorage"
import { motion } from 'framer-motion'


export default function ProgressBar({file, setFile, lang, setError}) {

    const { url, progress, error } = useStorage(file, lang)
    console.log(progress, url)

    useEffect(() => {
        if (error) {
            setError(error)
        }
        if(url) {
            setFile(null)
        }
    }, [url, setFile, setError, error])

    return (
        <motion.div className="progress-bar" 
            initial={{ width: 0 }}
            animate={{ width: progress + '%'}}>
            </motion.div>
    )
}
