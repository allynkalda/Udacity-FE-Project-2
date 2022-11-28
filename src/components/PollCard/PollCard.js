import { Link } from "react-router-dom";
import { Button } from '@mui/material';

import { formatDate } from '../../utils/date'
import './PollCard.css'

const PollCard = ({ question }) => {

    return (
        <div className="poll-card">
            <p data-testid="author">{question.author}</p>
            <p>{formatDate(question.timestamp)}</p>
            <Link to={`/questions/${question.id}`} className="link">
                <Button sx={{ backgroundColor: 'white', color: '#000', margin: 2}}>Show</Button>
            </Link>
        </div>
    )
}

export default PollCard