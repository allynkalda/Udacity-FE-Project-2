import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { setAuthedUser } from "../../actions/authedUser";

const Dropdown = ({ employees, dispatch }) => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('location', location)

    const [chosenUser, setChosenUser] = useState('')

    const handleSelect = (id) => {
        setChosenUser(employees[id].id)
        dispatch(setAuthedUser(employees[id]))
        navigate(location.state ? location.state.from.pathname : '/dashboard');
    }

    return (
        <>
        <h1>Employee Polls</h1>
        <img src="assets/login.png" alt="login" />
        <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel>Logged in as: </InputLabel>
        <Select
          value={chosenUser}
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

const mapStateToProps = ({ users }) => ({
    employees: users
  });

export default connect(mapStateToProps)(Dropdown)