import { _saveQuestion, _saveQuestionAnswer, questions } from './_DATA'

describe('_saveQuestion creates an error', () => {
    it('Rejects if no argument provided', async () => {
        await expect(_saveQuestion({})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
    })
})


describe('_saveQuestion resolves', () => {
    const mockQuestion = {
        optionOneText: 'Question 1',
        optionTwoText: 'Question 2',
        author: 'Author'
    }
    it('Resolves when argument provided', async () => {
        await expect(_saveQuestion(mockQuestion)).resolves.toEqual(
            expect.objectContaining({
                author: mockQuestion.author,
                optionOne: {
                    text: mockQuestion.optionOneText,
                    votes: []
                },
                optionTwo: {
                    text: mockQuestion.optionTwoText,
                    votes: []
                },
              })
        )
    })
})


describe('_saveQuestionAnswer creates an error', () => {
    it('Rejects if no argument provided', async () => {
        await expect(_saveQuestionAnswer({})).rejects.toEqual("Please provide authedUser, qid, and answer")
    })
})

describe('_saveQuestionAnswer resolves', () => {
    const mockQuestionAnswer = {
        authedUser: 'tylermcginnis',
        qid: '6ni6ok3ym7mf1p33lnez',
        answer: 'optionOne'
    }
    xit('Resolves when argument provided', async () => {
        await expect(_saveQuestionAnswer(mockQuestionAnswer)).resolves.toEqual()
    })
})