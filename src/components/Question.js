import { useState } from "react";
import { connect } from "react-redux"
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { sendSavedQuestionAnswer } from "../actions/questions";

const Question = ({ authedUser, questions, dispatch }) => {
    let { question_id } = useParams();
    const question = questions[question_id]
    const [ answer, setAnswer ] = useState('');

    const handleClickAnswer = (value) => {
        setAnswer(value);
    };

    const handleSubmit = () => {
        dispatch(sendSavedQuestionAnswer({
            authedUser,
            qid: question_id,
            answer
        }))
        console.log('answer', answer)
    }

    return (
        <div>
        <h2>Question</h2> 
        <p>Author: {question.author}</p>
        <p>Question</p>
        <div>
        <Button onClick={() => handleClickAnswer("optionOne")}>{question.optionOne.text}</Button>
        <Button onClick={() => handleClickAnswer("optionTwo")}>{question.optionTwo.text}</Button>
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

const mapStateToProps = ({ authedUser, questions }) => ({
    authedUser,
    questions
  });

export default connect(mapStateToProps)(Question)