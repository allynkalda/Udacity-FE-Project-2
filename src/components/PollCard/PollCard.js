import { Link } from "react-router-dom";
import { Button } from '@mui/material';

import { formatDate } from '../../utils/date'
import './PollCard.css'

const PollCard = ({ question }) => {

    return (
        <div className="poll-card">
            {!question.author || !question.timestamp || !question.id ? (
                <p data-testid="warning">We cannot find the question</p>
            ) : (
                <>
                <p data-testid="author">{question.author}</p>
                <p data-testid="timestamp">{formatDate(question.timestamp)}</p>
                <Link data-testid="link" to={`/questions/${question.id}`} className="link">
                    <Button sx={{ backgroundColor: 'white', color: '#000', margin: 2}}>Show</Button>
                </Link>
                </>
            )}
        </div>
    )
}

export default PollCard