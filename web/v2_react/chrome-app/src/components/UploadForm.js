import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

export default function UploadForm() {

    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const types = ['image/png', 'image/jpeg']

    function changeHandler(e) {
        let selected = e.target.files[0]

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError('')
        } else {
            setFile(null)
            setError('Please select an image file (png or jpeg)')
        }
    }

    return (
        <form>
            <input type="file" className="text-center mb-4" id="icon-button-file" 
            onChange={changeHandler} style={{ display: 'none'}}/>
            <label htmlFor="icon-button-file">
                <IconButton  color="primary" aria-label="upload picture"
                component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <div className="output">
                {error && <div className="error"> { error } </div>}
                {file && <div> { file.name } </div>}
                {file && <ProgressBar file={file} setFile={setFile}/>}
            </div>
        </form>
    )
}
