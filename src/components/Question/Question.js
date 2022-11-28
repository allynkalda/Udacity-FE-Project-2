import { useEffect, useState } from "react";
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
    const [ answered, setAnswered ] = useState(0)

    console.log('question', question)
    console.log('answered', answered)

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

    useEffect(() => {
        const checkOptionOne = question.optionOne.votes.includes(authedUser.id)
        const checkOptionTwo = question.optionTwo.votes.includes(authedUser.id)
        if (checkOptionOne) setAnswered(1)
        if (checkOptionTwo) setAnswered(2)
    }, [authedUser, question.optionOne.votes, question.optionTwo.votes])

    return (
        <div className="question-container">
        <h3>Poll by {question.author}</h3> 
        <img src={users[question.author].avatarURL} alt="avatar-question" className="avatar"/>
        <h4>Would you rather...</h4>
        <div className="questions">
        <Button sx={{ margin: 2, backgroundColor: answered === 1 && '#f45079 !important' }} disabled={answered !== 0} variant="contained" onClick={() => handleClickAnswer("optionOne")}>{question.optionOne.text}</Button>
        <Button sx={{ margin: 2, backgroundColor: answered === 2 && '#f45079 !important' }} disabled={answered !== 0} variant="contained" onClick={() => handleClickAnswer("optionTwo")}>{question.optionTwo.text}</Button>
        </div>
        <Button sx={{ margin: 2 }} variant="outlined" onClick={handleSubmit} disabled={answered !== 0}>Submit</Button>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions, users }) => ({
    users,
    authedUser,
    questions
  });

export default connect(mapStateToProps)(Question)