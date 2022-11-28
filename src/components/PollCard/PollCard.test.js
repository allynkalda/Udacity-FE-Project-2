import { render, screen } from '@testing-library/react';

import PollCard from './PollCard';

test('renders PollCard component', () => {

  const mockQuestion = {
      author: 'Author'
  }
  it('renders PollCard with data', () => {
    render(<PollCard question={mockQuestion} />)
  })
  expect(screen.getAllByTestId("author")).toBe(mockQuestion.author)
});