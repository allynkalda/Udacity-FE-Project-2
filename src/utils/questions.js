export const getNumberofAnswered = (questions, userId) => Object.keys(questions).filter((id) => 
    questions[id].optionOne.votes.includes(userId)
    || questions[id].optionTwo.votes.includes(userId))
    .map((id) => questions[id])

export const getNumberOfUnanswered = (questions, userId) =>
    Object.keys(questions).filter((id) => 
    questions[id].optionOne.votes.includes(userId)
    === questions[id].optionTwo.votes.includes(userId))
    .map((id) => questions[id])

export const createdQuestions = (questions, userId) => 
    questions.filter((question) => question.author === userId)