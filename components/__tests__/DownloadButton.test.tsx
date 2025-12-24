import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DownloadButton from '../DownloadButton';

describe('DownloadButton', () => {
  it('renders and triggers onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <DownloadButton onPress={onPress} />
    );
    fireEvent.press(getByText('YUKLAB OLISH'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows progress when downloading', () => {
    const { getByText } = render(
      <DownloadButton onPress={() => {}} progress={50} />
    );
    expect(getByText('50%')).toBeTruthy();
  });

  it('shows complete state', () => {
    const { getByText } = render(
      <DownloadButton onPress={() => {}} isComplete />
    );
    expect(getByText('YUKLAB OLINDI')).toBeTruthy();
  });
});
