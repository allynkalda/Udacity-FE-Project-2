import { connect } from "react-redux";

const LeaderBoard = ({ users, questions }) => {
    return (
        <div>
            <p>LeaderBoard</p>
            {users.map((user) => {
                const created = questions.filter((question) => question.author === user.id)
                const answered = Object.keys(questions).filter((id) => 
                    questions[id].optionOne.votes.includes(user.id)
                    || questions[id].optionTwo.votes.includes(user.id)
                    ).map((id) => questions[id])
                return (
                    <>
                    <p>{user.id}</p>
                    <p>Created: {created.length}</p>
                    <p>Answered: {answered.length}</p>
                    </>
                )
            })}
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