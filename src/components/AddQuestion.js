
import { useState } from "react";
import { connect } from "react-redux";
import { TextField, Button } from '@mui/material';

import { sendSavedQuestion } from "../actions/questions";

const DEFAULT_FORM = {
  optionOneText: "",
  optionTwoText: ""
}
const AddQuestion = ({ authedUser, dispatch }) => {
    console.log('authedUser', authedUser)
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
          author: authedUser
        }
        setFormValue(DEFAULT_FORM)
        console.log('formData', formData)
        dispatch(sendSavedQuestion(formData));
      }

    return (
        <>
        <p>Would you rather...</p>
        <TextField name="optionOneText" value={formValue.optionOneText} label="Question 1" variant="outlined" onChange={handleChange} />
        <TextField name="optionTwoText" value={formValue.optionTwoText} label="Question 2" variant="outlined" onChange={handleChange} />
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </>
    )
}
const mapStateToProps = ({ authedUser }) => ({
    authedUser
  });
export default connect(mapStateToProps)(AddQuestion)