import { useEffect } from "react";
import { connect } from "react-redux";
import { CircularProgress } from '@mui/material';

import PollCard from "../PollCard/PollCard";
import { getNumberofAnswered, getNumberOfUnanswered } from "../../utils/questions";
import { getAllQuestions } from "../../actions/shared";

import './Dashboard.css'

const Dashboard = ({ dispatch, answered, unanswered, loading }) => {
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
        <>
        <UnansweredList />
        <AnsweredList />
        </>
    )
}

const mapStateToProps = ({ authedUser, questions, loading }) => {
    console.log('questions', questions)
    return {
        authedUser,
        answered: getNumberofAnswered(questions, authedUser.id),
        loading,
        unanswered: getNumberOfUnanswered(questions, authedUser.id)
            .sort((a, b) => b.timestamp - a.timestamp)
      }
};

export default connect(mapStateToProps)(Dashboard)