import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import QualitySelector from '../QualitySelector';
import LoadingOverlay from '../LoadingOverlay';

describe('QualitySelector', () => {
  it('renders and allows selection', () => {
    const onSelect = jest.fn();
    const options = [
      { id: '1', label: 'MP4', resolution: '720p', fileSize: '10MB' },
      { id: '2', label: 'MP4', resolution: '480p', fileSize: '5MB' },
    ];
    const { getByText } = render(
      <QualitySelector options={options} selectedId={null} onSelect={onSelect} />
    );
    fireEvent.press(getByText('720p'));
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});

describe('LoadingOverlay', () => {
  it('renders with default message', () => {
    const { getByText } = render(<LoadingOverlay />);
    expect(getByText('YUKLANMOQDA...')).toBeTruthy();
  });
});
