import * as React from 'react';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, Box, Button } from '@mui/material';
import { setAuthedUser } from "../actions/authedUser";

const Navigation = ({ children, authedUser, dispatch }) => {
    let navigate = useNavigate();

    const [value, setValue] = React.useState(0);

    const handleChange = (newValue, url) => {
      setValue(newValue);
      navigate(url)
    };

    const handleLogout = () => {
      dispatch(setAuthedUser(""))
    };
    
    return (
        <Box sx={{ width: '100%' }}>
        <p>Logged in as {authedUser}</p>
        <Button onClick={handleLogout}>Log out</Button>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} aria-label="basic tabs example">
            <Tab label="Dashboard" onClick={() => handleChange(0, '/dashboard')} />
            <Tab label="Leaderboard" onClick={() => handleChange(1, '/leaderboard')} />
            <Tab label="Add Question" onClick={() => handleChange(2, '/add')} />
          </Tabs>
        </Box>
        {children}
      </Box>
    )
}

const mapStateToProps = ({ authedUser }) => ({
    authedUser,
  });


export default connect(mapStateToProps)(Navigation)