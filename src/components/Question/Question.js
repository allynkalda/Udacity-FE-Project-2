import { useEffect, useState } from "react";
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Button, Alert } from '@mui/material';

import { sendSavedQuestionAnswer } from "../../actions/questions";

import './Question.css'

const Question = ({ authedUser, questions, dispatch, users }) => {
    let { question_id } = useParams();
    let navigate = useNavigate();
    const question = questions[question_id]
    const [ answer, setAnswer ] = useState('')
    const [ answered, setAnswered ] = useState(0)
    const [ isSuccess, setIsSuccess ] = useState(false)

    const handleClickAnswer = (value) => {
        setAnswer(value);
    };

    console.log('question', question)

    const handleSubmit = () => {
        dispatch(sendSavedQuestionAnswer({
            authedUser: authedUser.id,
            qid: question_id,
            answer
        }))
        setIsSuccess(true)
    }

    useEffect(() => {
        if (!question) {
            navigate("/error");
        } else {
            const checkOptionOne = question.optionOne?.votes.includes(authedUser.id)
            const checkOptionTwo = question.optionTwo?.votes.includes(authedUser.id)
            if (checkOptionOne) setAnswered(1)
            if (checkOptionTwo) setAnswered(2)
        }
    }, [authedUser, navigate, question, question?.optionOne?.votes, question?.optionTwo?.votes])

    const percentageByOption = (option) => {
        const sumOfVotes = question?.optionOne.votes.length + question?.optionTwo.votes.length
        let percent;
        if (option === 1) {
            percent = (question?.optionOne.votes.length / sumOfVotes) * 100
        } else {
            percent = (question?.optionTwo.votes.length / sumOfVotes) * 100
        }
        return percent.toFixed(0)
    }

    return question ? (
        <div className="question-container">
        {isSuccess && <Alert severity="success">Answer submitted!</Alert>}
        <h3>Poll by {question.author}</h3> 
        <img src={users[question.author].avatarURL} alt="avatar-question" className="avatar"/>
        <h4>Would you rather...</h4>
        <div className="questions">
        <Button sx={{ margin: 2, backgroundColor: answered === 1 && '#f45079 !important' }} disabled={answered !== 0} variant="contained" onClick={() => handleClickAnswer("optionOne")}>{question.optionOne.text}</Button>
        <Button sx={{ margin: 2, backgroundColor: answered === 2 && '#f45079 !important' }} disabled={answered !== 0} variant="contained" onClick={() => handleClickAnswer("optionTwo")}>{question.optionTwo.text}</Button>
        </div>
        <Button sx={{ margin: 2 }} variant="outlined" onClick={handleSubmit} disabled={answered !== 0}>Submit</Button>
        <div className="status">
        <p>Stats:</p>
            <p>Option 1 - Votes: {question?.optionOne.votes.length}, Percentage: {percentageByOption(1)}%</p>
            <p>Option 2 - Votes: {question?.optionTwo.votes.length}, Percentage: {percentageByOption(2)}%</p>
        </div>
        </div>
    ) : null
}

const mapStateToProps = ({ authedUser, questions, users }) => ({
    users,
    authedUser,
    questions
  });

export default connect(mapStateToProps)(Question)