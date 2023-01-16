import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { formatDate } from '../../utils/date';

import PollCard from './PollCard';

const mockQuestion = {
  author: 'Author',
  timestamp: 1468479767190,
  id: 123
}

describe('Match snapshot of PollCard', () => {
  it('will match snapshot', () => {
    const view = render(<PollCard question={mockQuestion} />, {wrapper: MemoryRouter})
    expect(view).toMatchSnapshot()
  })
})

test('renders author and button label', () => {

  render(<PollCard question={mockQuestion} />, {wrapper: MemoryRouter})

  expect(screen.getByTestId("author")).toHaveTextContent(mockQuestion.author)
  expect(screen.getByRole("button")).toHaveTextContent("Show")
});

test('renders converted timestamp', () => {

  render(<PollCard question={mockQuestion} />, {wrapper: MemoryRouter})

  expect(screen.getByTestId("timestamp")).toHaveTextContent(formatDate(mockQuestion.timestamp))
});

test('renders error warning when props is empty', () => {

  render(<PollCard question={{}} />, {wrapper: MemoryRouter})

  expect(screen.getByTestId("warning")).toHaveTextContent('We cannot find the question')
});

test('renders error warning when props has single element', () => {

  render(<PollCard question={{ author: 'Me' }} />, {wrapper: MemoryRouter})

  expect(screen.getByTestId("warning")).toHaveTextContent('We cannot find the question')
});

test('link goes to a different route', async () => {
  const history = createMemoryHistory();

  history.push = jest.fn();

  render(
    <Router location={history.location} navigator={history}>
      <PollCard question={mockQuestion} />
    </Router>
  )

  const link = screen.getByTestId('link')
  fireEvent.click(link);

  expect(history.push).toHaveBeenCalledWith(    {
    hash: '',
    pathname: '/questions/123',
    search: '',
  },
  undefined,
  {"preventScrollReset": undefined, "relative": undefined, "replace": false, "state": undefined}
  );
});