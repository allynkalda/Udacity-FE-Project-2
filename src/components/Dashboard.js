import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getAllQuestions } from "../actions/shared";

const Dashboard = ({ authedUser, dispatch, answered, unanswered }) => {
    useEffect(() => {
        dispatch(getAllQuestions());
      }, [dispatch]);

    const UnansweredList = () => (
        <div>
            <h3>Unanswered</h3>
            {unanswered.map((question) => (
                <p><Link to={`/questions/${question.id}`}>{question.author} {question.id}</Link></p>
            ))}
        </div>
    )

    const AnsweredList = () => (
        <div>
            <h3>Answered</h3>
            {answered.map((question) => (
                <p><Link to={`/questions/${question.id}`}>{question.author} {question.id}</Link></p>
            ))}
        </div>
    )
    return (
        <>
        <p>Dashboard</p>
        <UnansweredList />
        <AnsweredList />
        </>
    )
}

const mapStateToProps = ({ authedUser, questions }) => {
    return {
        authedUser,
        answered: Object.keys(questions).filter((id) => 
        questions[id].optionOne.votes.includes(authedUser)
        || questions[id].optionTwo.votes.includes(authedUser)
        ).map((id) => questions[id]),
        unanswered: Object.keys(questions).filter((id) => 
        questions[id].optionOne.votes.includes(authedUser)
        === questions[id].optionTwo.votes.includes(authedUser)
        ).map((id) => questions[id]),
      }
};

export default connect(mapStateToProps)(Dashboard)