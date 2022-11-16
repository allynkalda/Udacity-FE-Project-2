
import { useState } from "react";
import { connect } from "react-redux";
import TextField from '@mui/material/TextField';

const AddQuestion = ({ authedUser }) => {
    console.log('authedUser', authedUser)
    const [formValue, setFormValue] = useState({
        optionOne: "",
        optionTwo: "",
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
          return {
            ...prevState,
            [name]: value,
          };
        });
      };

      const { optionOne, optionTwo } = formValue;
    return (
        <>
        <p>Would you rather...</p>
        <TextField name="optionOne" value={optionOne} label="Question 1" variant="outlined" onChange={handleChange} />
        <TextField name="optionTwo" value={optionTwo} label="Question 2" variant="outlined" onChange={handleChange} />
        </>
    )
}
const mapStateToProps = ({ authedUser }) => ({
    authedUser
  });
export default connect(mapStateToProps)(AddQuestion)