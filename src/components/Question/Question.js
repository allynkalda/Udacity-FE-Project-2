import { useState } from "react";
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { sendSavedQuestionAnswer } from "../../actions/questions";

import './Question.css'

const Question = ({ authedUser, questions, dispatch, users }) => {
    let { question_id } = useParams();
    let navigate = useNavigate();
    const question = questions[question_id]
    const [ answer, setAnswer ] = useState('');

    const handleClickAnswer = (value) => {
        setAnswer(value);
    };

    const handleSubmit = () => {
        dispatch(sendSavedQuestionAnswer({
            authedUser: authedUser.id,
            qid: question_id,
            answer
        }))
        navigate("/dashboard");
    }

    return (
        <div className="question-container">
        <h3>Poll by {question.author}</h3> 
        <img src={users[question.author].avatarURL} alt="avatar-question" className="avatar"/>
        <h4>Would you rather...</h4>
        <div className="questions">
        <Button sx={{ margin: 2 }} variant="contained" onClick={() => handleClickAnswer("optionOne")}>{question.optionOne.text}</Button>
        <Button sx={{ margin: 2 }} variant="contained" onClick={() => handleClickAnswer("optionTwo")}>{question.optionTwo.text}</Button>
        </div>
        <Button sx={{ margin: 2 }} variant="outlined" onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions, users }) => ({
    users,
    authedUser,
    questions
  });

export default connect(mapStateToProps)(Question)