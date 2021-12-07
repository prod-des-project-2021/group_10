import React, { useState} from 'react'
import { Button, Alert } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"

export default function Gdpr() {
    const [agree, setAgree] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const checkboxHandler = () => {
        setAgree(!agree)
    }

    const btnHandler= () => {
        try {
            setError("")
            navigate("/")
          } catch(e) {
              setError(e.toString)
          }
    }



    return (
    <>
        <div style={{width: 'fit-content', height: '100%', paddingBottom: '50px', paddingTop: '50px'}}>
            {error && <Alert>{error}</Alert>}
            <h2 className="text-center mb-4">Thank you for signing up</h2>
            <h2 className="text-center mb-4">Please review the terms and conditions</h2>
            <div>
                <p> Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [business name]’s relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website. </p>
                <p> The term ‘project’ or ‘us’ or ‘we’ refers to the owner of the website whose registered office is [address]. Our company registration number is [company registration number and place of registration]. The term ‘you’ refers to the user or viewer of our website.</p>
                <p> The content of the pages of this website is for your general information and use only. It is subject to change without notice.</p>
                <p> This project stores your data (email, pictures and text extracted from those pictures) in a Firebase database. Once signed up, your password will not be visible</p>
                <p> We will not give your data to third parties without your consent</p>
                <p> Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</p>
                <p> Your use of this website and any dispute arising out of such use of the website is subject to the law of Finland</p>
                <p> The use of this website is subject to the following terms of use</p>
            </div>
            <input type="checkbox" id="agree" onChange={checkboxHandler} />
            <label htmlFor="agree"> I agree to <b>terms and conditions</b></label>
            {agree && <Button className="btn" onClick={btnHandler}
                        style={{marginLeft: '30px'}}>
                        Continue
                        </Button>}
        </div>
    </>)
}
