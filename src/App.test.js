import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import Home from './components/Home'
import NewDoc from './components/NewDoc'
import UpdateDoc from './components/UpdateDoc'
import { MemoryRouter } from 'react-router-dom';

let TEST_DATA = [
  {
    _id: "test",
    name: "test",
    html: "test"
  }
]

test('renders header Welcome to Text Editor!', () => {
  render(<App />, { wrapper: MemoryRouter });
  const headerElement = screen.getByText(/Welcome to Text Editor!/i);
  expect(headerElement).toBeInTheDocument();
});


test('New document button is on the page', () => {
  render(<Home />, { wrapper: MemoryRouter });
  const buttons = screen.getByText(/New document/i);
  expect(buttons).toBeTruthy();
});

test('Edit document button is on the page', () => {
  render(<Home />, { wrapper: MemoryRouter });
  const buttons = screen.getByText(/Edit document/i);
  expect(buttons).toBeTruthy();
});

test('Make sure button is disabled when input of name is empty', () => {
  render(<NewDoc />, { wrapper: MemoryRouter });
  const saveButton = screen.getByText(/Save as new document/i);
  expect(saveButton).toBeDisabled();
});


test('Make sure button is hidden when no doucment selected', () => {
  render(<UpdateDoc docs={TEST_DATA} />, { wrapper: MemoryRouter });
  const button = screen.getByTestId(/hidden/i);
  expect(button).not.toBeVisible();
});

test('Make sure input title field is disabled when no doucment selected', () => {
  render(<UpdateDoc docs={TEST_DATA} />, { wrapper: MemoryRouter });
  const button = screen.getByTestId(/title/i);
  expect(button).toBeDisabled();
});