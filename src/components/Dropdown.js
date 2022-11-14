import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Dropdown = ({ employees, authedUser, dispatch }) => {

    let navigate = useNavigate();

    const handleSelect = (id) => {
        dispatch(setAuthedUser(id))
        navigate("/dashboard");
    }

    return (
        <>
        <label>Logged in: </label>
        <select name="employees" id="employees" value={authedUser} onChange={(e) => handleSelect(e.target.value)}>
        <option disabled value=""> -- select an option -- </option>
        {employees.map((employee) => <option key={employee} value={employee}>{employee}</option>)}
        </select> 
        </>  
    )

}

const mapStateToProps = ({ users, authedUser }) => ({
    employees: Object.keys(users),
    authedUser
  });

export default connect(mapStateToProps)(Dropdown)