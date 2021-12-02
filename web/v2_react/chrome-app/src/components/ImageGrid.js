import React from 'react'
import useFirestore from '../hooks/useFirestore'
import { useAuth } from '../contexts/AuthContext'
import { motion } from 'framer-motion'

export default function ImageGrid({setSelectedImg, setSelectedText}) {
    const { currentUser } = useAuth()
    const { docs } = useFirestore(currentUser.uid)

    return (
        <div className="img-grid">
            { docs && docs.map(doc => (
            <motion.div className="img-wrap" key={doc.id}
                layout
                whileHover={{ opacity: 1}}
                onClick={() => {
                setSelectedImg(doc.url)
                setSelectedText(doc.text)
            }}>
                <motion.img src={doc.url} alt="uploaded pic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                />
            </motion.div>))}
        </div>
    )
}
