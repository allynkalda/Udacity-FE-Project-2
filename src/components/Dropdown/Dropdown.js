import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { setAuthedUser } from "../../actions/authedUser";

const Dropdown = ({ employees, authedUser, dispatch }) => {
    let navigate = useNavigate();

    const handleSelect = (id) => {
        dispatch(setAuthedUser(employees[id]))
        navigate("/dashboard");
    }

    return (
        <>
        <h1>Employee Polls</h1>
        <img src="assets/login.png" alt="login" />
        <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel>Logged in as: </InputLabel>
        <Select
          value={authedUser}
          label="Login"
          onChange={(e) => handleSelect(e.target.value)}
        >
            {Object.keys(employees).map((employee) => {
                return <MenuItem key={employee} value={employee}>{employee}</MenuItem>
            })}
        </Select>
        </FormControl>
        </>  
    )

}

const mapStateToProps = ({ users, authedUser }) => ({
    employees: users,
    authedUser
  });

export default connect(mapStateToProps)(Dropdown)