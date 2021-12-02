import React from 'react'
import { motion } from 'framer-motion'

export default function Modal({selectedImg, setSelectedImg, setSelectedText, selectedText}) {

    function handleClick(e) {
        if(e.target.classList.contains('backdrop')) {
            setSelectedImg(null)
            setSelectedText(null)
        }
    }

    return (
        <>
        <motion.div className="backdrop" onClick={handleClick}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}>
            <motion.img src={selectedImg} alt="enlarged pic"
                initial={{ y: "-10vh"}}
                animate={{ y: 0 }}/>
            <h3 style={{display: 'flex', justifyContent: 'center', color: 'white'}}>{selectedText}</h3>
        </motion.div>
        </>
    )
}
