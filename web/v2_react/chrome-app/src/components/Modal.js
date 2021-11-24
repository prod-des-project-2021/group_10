import React from 'react'
import { motion } from 'framer-motion'

export default function Modal({selectedImg, setSelectedImg}) {

    function handleClick(e) {
        if(e.target.classList.contains('backdrop')) {
            setSelectedImg(null)
        }
    }

    return (
        <motion.div className="backdrop" onClick={handleClick}
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}>
            <motion.img src={selectedImg} alt="enlarged pic"
                initial={{ y: "-10vh"}}
                animate={{ y: 0 }}/>
        </motion.div>
    )
}
