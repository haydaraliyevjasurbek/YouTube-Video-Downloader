import React from 'react';
import { render } from '@testing-library/react-native';
import VideoPreviewCard from '../VideoPreviewCard';

describe('VideoPreviewCard', () => {
  it('renders title, channel, views', () => {
    const { getByText } = render(
      <VideoPreviewCard
        thumbnail="https://img.youtube.com/vi/test/maxresdefault.jpg"
        title="Test Video"
        channel="Test Channel"
        duration="1:23"
        views="123"
      />
    );
    expect(getByText('Test Video')).toBeTruthy();
    expect(getByText('Test Channel')).toBeTruthy();
    expect(getByText('123 marta ko‘rilgan')).toBeTruthy();
  });
});
