import React, { useState } from 'react';
import './PollComponent.css'; // Ensure to place the CSS in a separate file or include it in your global styles.

const PollComponent: React.FC = () => {
  const [pollAnswered, setPollAnswered] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [percentages, setPercentages] = useState<number[]>([0, 0, 0, 0]);

  const handleReset = () => {
    setPollAnswered(false);
    setSelectedChoice(null);
    setPercentages([0, 0, 0, 0]);
  };

  const handleChoiceChange = (index: number) => {
    setSelectedChoice(index);
    setPollAnswered(true);

    // Randomly generate percentages
    let total = 100;
    let remaining = total;
    const values = new Array(4).fill(0).map(() => {
      const value = Math.ceil(Math.random() * remaining);
      remaining -= value;
      return value;
    });
    values[values.length - 1] += remaining;

    setPercentages(values);
  };

  return (
    <div id="app">
      <h1>Poll with Animation</h1>
      <div className="post">
        <p className="text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
          quas itaque! Aliquam laboriosam mollitia quod nulla nostrum possimus?
        </p>

        <section className={`poll ${pollAnswered ? 'answered' : ''}`}>
          <p className="poll-details">Poll • Ends in 22h</p>
          <ul className="poll-choices">
            {['Dolor', 'Lorem', 'Assumenda, quas itaque! Aliquam laboriosam mollitia quod nulla nostrum possimus', 'IDC, just wanna creep'].map((answer, i) => (
              <li key={i} className={`poll-choice choice-${i + 1} ${percentages[i] === Math.max(...percentages) ? 'winner' : ''}`}>
                <label htmlFor={`choice-${i + 1}`}>
                  <div className="poll-result" style={{ '--percent': `${percentages[i]}%` } as React.CSSProperties}>
                    <div className="star"><div></div></div>
                  </div>
                  <div className="poll-label">
                    <div className="radio">
                      <input
                        type="radio"
                        id={`choice-${i + 1}`}
                        name="poll"
                        checked={selectedChoice === i}
                        onChange={() => handleChoiceChange(i)}
                      />
                    </div>
                    <div className="answer">{answer}</div>
                  </div>
                  <p className="poll-percent">{percentages[i]}%</p>
                </label>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <button onClick={handleReset}>Reset</button>
      <div className="social-icons">
        <a className="social-icon codepen" href="https://codepen.io/simeydotme" title="view my codepens">
          Made by Simey
        </a>
        <a className="social-icon twitter" href="https://twitter.com/simeydotme">
          {/* Add your Twitter SVG */}
        </a>
        <a className="social-icon github" href="https://github.com/simeydotme">
          {/* Add your GitHub SVG */}
        </a>
      </div>
    </div>
  );
};

export default PollComponent;
