import * as React from 'react';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const Navigation = ({ children, authedUser }) => {
    let navigate = useNavigate();

    const [value, setValue] = React.useState(0);

    const handleChange = (newValue, url) => {
      setValue(newValue);
      navigate(url)
    };

    
    return (
        <Box sx={{ width: '100%' }}>
        <p>Logged in as {authedUser}</p>
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