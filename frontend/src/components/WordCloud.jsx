import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const WordCloud = () => {
  const options = {
    fontSizes: [5, 20],           // Bigger font sizes
    rotations: 0,                  // No rotation
    padding: 8,                    // More spacing between words
    deterministic: true,          // Fixed layout
    transitionDuration: 500,      // Smoother render
  };

  const callbacks = {
    getWordTooltip: word => word.text, // Show only the word on hover
  };

  const words = [
    { text: 'Artificial Intelligence', value: 70 },
    { text: 'Data Structures & Algorithms', value: 78 },
    { text: 'Web Development', value: 50 },
    { text: 'Cybersecurity', value: 66 },
    { text: 'Database Systems', value: 60 },
    { text: 'Python Programming', value: 58 },
    { text: 'Operating Systems', value: 54 },
    { text: 'Computer Networks', value: 50 },
    { text: 'Machine Learning', value: 48 },
    { text: 'Cloud Computing', value: 60 },
  ];

  return (
    <div style={{ height: 185, width: 330 }}>
      <ReactWordcloud words={words} options={options} callbacks={callbacks} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default WordCloud;
