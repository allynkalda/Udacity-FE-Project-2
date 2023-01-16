import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { CircularProgress, Tabs, Tab, Box,  } from '@mui/material';

import PollCard from "../PollCard/PollCard";
import { getNumberofAnswered, getNumberOfUnanswered } from "../../utils/questions";
import { getAllQuestions } from "../../actions/shared";

import './Dashboard.css'

const Dashboard = ({ dispatch, answered, unanswered, loading }) => {

    const [value, setValue] = useState(0);

    const handleChange = (newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
        dispatch(getAllQuestions());
      }, [dispatch]);

      console.log('unanswered', unanswered)

    const UnansweredList = () => (
        <div className="poll-list-container">
            <h3>Unanswered</h3>
            <div className="poll-list">
                {loading && <CircularProgress />}
                {unanswered.map((question, index) => (
                    <PollCard key={index} question={question} />
                ))}
            </div>
        </div>
    )

    const AnsweredList = () => (
        <div className="poll-list-container">
            <h3>Answered</h3>
            <div className="poll-list">
                {loading && <CircularProgress />}
                {answered.map((question, index) => (
                    <PollCard key={index} question={question} />
                ))}
            </div>
        </div>
    )
    return (
    <Box sx={{ width: '100%', padding: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} aria-label="basic tabs example">
            <Tab label="Unanswered List" onClick={() => handleChange(0)} />
            <Tab label="Answered List" onClick={() => handleChange(1)} />
          </Tabs>
        </Box>
        {value === 0 ? <UnansweredList /> : <AnsweredList />}
    </Box>
    )
}

const mapStateToProps = ({ authedUser, questions, loading }) => {
    return {
        authedUser,
        answered: getNumberofAnswered(questions, authedUser.id),
        loading,
        unanswered: getNumberOfUnanswered(questions, authedUser.id)
            .sort((a, b) => b.timestamp - a.timestamp)
      }
};

export default connect(mapStateToProps)(Dashboard)