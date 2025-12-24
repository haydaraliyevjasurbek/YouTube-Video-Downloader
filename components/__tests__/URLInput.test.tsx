import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import URLInput from '../URLInput';

describe('URLInput', () => {
  it('renders and allows input', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <URLInput onSubmit={onSubmit} />
    );
    const input = getByPlaceholderText('https://youtube.com/watch?v=...');
    fireEvent.changeText(input, 'https://test.com');
    expect(input.props.value).toBe('https://test.com');
  });

  it('calls onSubmit on submit', () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <URLInput onSubmit={onSubmit} />
    );
    const input = getByPlaceholderText('https://youtube.com/watch?v=...');
    fireEvent.changeText(input, 'https://test.com');
    fireEvent(input, 'submitEditing');
    expect(onSubmit).toHaveBeenCalledWith('https://test.com');
  });
});
