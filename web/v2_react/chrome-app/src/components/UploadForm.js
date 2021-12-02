import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function UploadForm() {

    const [file, setFile] = useState(null)
    const [language, setLanguage] = useState("fin")
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

    function changeLanguage(e) {
        setLanguage(e.target.value)
    }

    return (
        <form>
            <input type="file" className="text-center mb-4" id="icon-button-file" 
            onChange={changeHandler} style={{ display: 'none'}}/>
            <label htmlFor="icon-button-file" style={{display: 'flex', justifyContent: 'center'}}>
                <IconButton  color="primary" aria-label="upload picture"
                component="span" >
                    <PhotoCamera />
                </IconButton>
            </label>
            <div className="output">
                {error && <div className="error"> { error } </div>}
                {file && <div> { file.name } </div>}
                {file && <ProgressBar file={file} setFile={setFile} lang={language} setError={setError}/>}
            </div>
            <h3 style={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>Text language</h3>
            <RadioGroup row
            aria-label="gender"
            name="radio-buttons-group"
            onChange={changeLanguage}
            style={{display: 'flex', justifyContent: 'space-around'}}>
                <FormControlLabel value="fin" control={<Radio />} label="Finnish"/>
                <FormControlLabel value="eng" control={<Radio />} label="English" labelPlacement="start"/>
            </RadioGroup>
        </form>
    )
}
