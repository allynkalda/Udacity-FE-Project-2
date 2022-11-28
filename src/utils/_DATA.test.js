import { _saveQuestion, _saveQuestionAnswer, questions, createUpdatedQuestions } from './_DATA'

describe('_saveQuestion resolves', () => {
    const mockQuestion = {
        optionOneText: 'Question 1',
        optionTwoText: 'Question 2',
        author: 'sarahedo'
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

describe('_saveQuestionAnswer resolves', () => {
    const mockQuestionAnswer = {
        authedUser: 'tylermcginnis',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne'
    }
    it('Resolves when argument provided', async () => {
        await expect(_saveQuestionAnswer(mockQuestionAnswer)).resolves.toEqual(
            expect.objectContaining({
                "8xf0y6ziyjabvozdd253nd": {
                    "author": "sarahedo",
                    "id": "8xf0y6ziyjabvozdd253nd",
                    "optionOne": {"text": "Build our new application with Javascript", "votes": ["sarahedo","tylermcginnis",]},
                    "optionTwo": {
                    "text": "Build our new application with Typescript",
                    "votes":  [],
                    },
                    "timestamp": 1467166872634,
                }
            })
        )
    })
})

describe('_saveQuestion creates an error', () => {
    it('Rejects if no argument provided', async () => {
        await expect(_saveQuestion({})).rejects.toEqual("Please provide optionOneText, optionTwoText, and author")
    })
})

describe('_saveQuestionAnswer creates an error', () => {
    it('Rejects if no argument provided', async () => {
        await expect(_saveQuestionAnswer({})).rejects.toEqual("Please provide authedUser, qid, and answer")
    })
})