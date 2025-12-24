import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';

describe('ErrorMessage', () => {
  it('renders and calls onRetry', () => {
    const onRetry = jest.fn();
    const { getByText } = render(
      <ErrorMessage message="Xatolik" onRetry={onRetry} />
    );
    fireEvent.press(getByText('QAYTA URINISH'));
    expect(onRetry).toHaveBeenCalled();
  });
});

describe('SuccessMessage', () => {
  it('renders and calls onOpenVideo', () => {
    const onOpenVideo = jest.fn();
    const { getByText } = render(
      <SuccessMessage onOpenVideo={onOpenVideo} />
    );
    fireEvent.press(getByText('OCHISH'));
    expect(onOpenVideo).toHaveBeenCalled();
  });
});
