import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getNumberofAnswered, createdQuestions } from "../../utils/questions";

import './LeaderBoard.css';

const LeaderBoard = ({ users, questions }) => {
    const [ sortedUsers, setSortedUsers ] = useState([])

    useEffect(() => {
        const comparingFn = (a, b) => {
            const sum1 = createdQuestions(questions, a.id).length + getNumberofAnswered(questions, a.id).length;
            const sum2 = createdQuestions(questions, b.id).length + getNumberofAnswered(questions, b.id).length;
            return sum2 - sum1;
        };
        setSortedUsers(users.sort(comparingFn))
    }, [users, questions])

    return (
        <div className="leaderboard">
            <h3>LeaderBoard</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow sx={{ backgroundColor: '#1664C0' }}>
                        <TableCell sx={{ color: '#fff' }} >Employee</TableCell>
                        <TableCell sx={{ color: '#fff' }} align="center">Answered</TableCell>
                        <TableCell sx={{ color: '#fff' }} align="center">Created</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {sortedUsers.map((user) => {
                        const created = createdQuestions(questions, user.id)
                        const answered = getNumberofAnswered(questions, user.id)
                        return (
                            <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                <div className="avatar-profile">
                                    <img className="avatar" src={user.avatarURL} alt="avatar" />
                                    <em>{user.name}</em>
                                </div>
                            </TableCell>
                            <TableCell align="center">{answered.length}</TableCell>
                            <TableCell align="center">{created.length}</TableCell>
                            </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const mapStateToProps = ({ users, questions }) => {
    return {
        users: Object.keys(users).map((id) => users[id]),
        questions: Object.keys(questions).map((id) => questions[id])
      }
};

export default connect(mapStateToProps)(LeaderBoard)