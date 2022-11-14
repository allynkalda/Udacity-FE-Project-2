import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllQuestions } from "../actions/shared";

const Dashboard = ({ authedUser, dispatch, answered, unanswered }) => {
    useEffect(() => {
        dispatch(getAllQuestions());
      }, []);

      console.log('answered', answered)
      console.log('unanswered', unanswered)
    return (
        <>
        <p>Logged in as {authedUser}</p>
        <p>Dashboard</p>
        </>
    )
}

const mapStateToProps = ({ authedUser, questions }) => ({
    authedUser,
    answered: Object.keys(questions).filter((id) => {
        const answeredOptionOne = questions[id] && questions[id].optionOne.votes.includes(authedUser)
        const answeredOptionTwo = questions[id] && questions[id].optionTwo.votes.includes(authedUser)
        return answeredOptionOne || answeredOptionTwo
    }).map((id) => questions[id]),
    unanswered: Object.keys(questions).filter((id) => {
        const answeredOptionOne = questions[id] && questions[id].optionOne.votes.includes(authedUser)
        const answeredOptionTwo = questions[id] && questions[id].optionTwo.votes.includes(authedUser)
        return !answeredOptionOne || !answeredOptionTwo
    }).map((id) => questions[id]),
  });

export default connect(mapStateToProps)(Dashboard)