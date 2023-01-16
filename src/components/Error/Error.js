import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';

import './Error.css'

const Error = () => {

  let navigate = useNavigate();

  const goHome = () => navigate("/dashboard");

    return (
        <div className="error-container">
          <h1>404 error!</h1>
          <h4>This page does not exist.</h4>
          <Button sx={{ margin: 2 }} variant="contained"  onClick={goHome}>Go back home</Button>
        </div>
    )
}

export default Error