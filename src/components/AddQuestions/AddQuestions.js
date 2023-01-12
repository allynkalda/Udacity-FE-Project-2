import { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

import { sendSavedQuestion } from "../../actions/questions";

import './AddQuestions.css'

const DEFAULT_FORM = {
  optionOneText: "",
  optionTwoText: ""
}
const AddQuestion = ({ authedUser, dispatch }) => {
  let navigate = useNavigate();
  const [formValue, setFormValue] = useState(DEFAULT_FORM);

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };

      const handleSubmit = () => {
        const formData =  {
          ...formValue,
          author: authedUser.id
        }
        
        setFormValue(DEFAULT_FORM)
        dispatch(sendSavedQuestion(formData));
        navigate("/dashboard");
      }

    return (
        <div className="text-field-container">
        <h3>Would you rather...</h3>
        <TextField margin="normal" name="optionOneText" value={formValue.optionOneText} label="Question 1" variant="outlined" onChange={handleChange} />
        <TextField margin="normal" name="optionTwoText" value={formValue.optionTwoText} label="Question 2" variant="outlined" onChange={handleChange} />
        <Button sx={{ margin: 2 }} type="submit" onClick={handleSubmit}>Submit</Button>
        </div>
    )
}
const mapStateToProps = ({ authedUser }) => ({
    authedUser
  });
export default connect(mapStateToProps)(AddQuestion)