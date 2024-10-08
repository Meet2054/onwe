import { useEffect, useRef } from 'react';
import './LogoutButton.scss'; // Add a CSS module or global stylesheet for your styles

const logoutButtonStates = {
  'default': {
    '--figure-duration': '100',
    '--transform-figure': 'none',
    '--walking-duration': '100',
    '--transform-arm1': 'none',
    '--transform-wrist1': 'none',
    '--transform-arm2': 'none',
    '--transform-wrist2': 'none',
    '--transform-leg1': 'none',
    '--transform-calf1': 'none',
    '--transform-leg2': 'none',
    '--transform-calf2': 'none'
  },
  'hover': {
    '--figure-duration': '100',
    '--transform-figure': 'translateX(1.5px)',
    '--walking-duration': '100',
    '--transform-arm1': 'rotate(-5deg)',
    '--transform-wrist1': 'rotate(-15deg)',
    '--transform-arm2': 'rotate(5deg)',
    '--transform-wrist2': 'rotate(6deg)',
    '--transform-leg1': 'rotate(-10deg)',
    '--transform-calf1': 'rotate(5deg)',
    '--transform-leg2': 'rotate(20deg)',
    '--transform-calf2': 'rotate(-20deg)'
  },
  'walking1': {
    '--figure-duration': '300',
    '--transform-figure': 'translateX(11px)',
    '--walking-duration': '300',
    '--transform-arm1': 'translateX(-4px) translateY(-2px) rotate(120deg)',
    '--transform-wrist1': 'rotate(-5deg)',
    '--transform-arm2': 'translateX(4px) rotate(-110deg)',
    '--transform-wrist2': 'rotate(-5deg)',
    '--transform-leg1': 'translateX(-3px) rotate(80deg)',
    '--transform-calf1': 'rotate(-30deg)',
    '--transform-leg2': 'translateX(4px) rotate(-60deg)',
    '--transform-calf2': 'rotate(20deg)'
  },
  'walking2': {
    '--figure-duration': '400',
    '--transform-figure': 'translateX(17px)',
    '--walking-duration': '300',
    '--transform-arm1': 'rotate(60deg)',
    '--transform-wrist1': 'rotate(-15deg)',
    '--transform-arm2': 'rotate(-45deg)',
    '--transform-wrist2': 'rotate(6deg)',
    '--transform-leg1': 'rotate(-5deg)',
    '--transform-calf1': 'rotate(10deg)',
    '--transform-leg2': 'rotate(10deg)',
    '--transform-calf2': 'rotate(-20deg)'
  },
  'falling1': {
    '--figure-duration': '1600',
    '--walking-duration': '400',
    '--transform-arm1': 'rotate(-60deg)',
    '--transform-wrist1': 'none',
    '--transform-arm2': 'rotate(30deg)',
    '--transform-wrist2': 'rotate(120deg)',
    '--transform-leg1': 'rotate(-30deg)',
    '--transform-calf1': 'rotate(-20deg)',
    '--transform-leg2': 'rotate(20deg)'
  },
  'falling2': {
    '--walking-duration': '300',
    '--transform-arm1': 'rotate(-100deg)',
    '--transform-arm2': 'rotate(-60deg)',
    '--transform-wrist2': 'rotate(60deg)',
    '--transform-leg1': 'rotate(80deg)',
    '--transform-calf1': 'rotate(20deg)',
    '--transform-leg2': 'rotate(-60deg)'
  },
  'falling3': {
    '--walking-duration': '500',
    '--transform-arm1': 'rotate(-30deg)',
    '--transform-wrist1': 'rotate(40deg)',
    '--transform-arm2': 'rotate(50deg)',
    '--transform-wrist2': 'none',
    '--transform-leg1': 'rotate(-30deg)',
    '--transform-leg2': 'rotate(20deg)',
    '--transform-calf2': 'none'
  }
};

const LogoutButton = () => {
  const buttonRef = useRef(null);

  const updateButtonState = (button, state) => {
    if (logoutButtonStates[state]) {
      for (let key in logoutButtonStates[state]) {
        button.style.setProperty(key, logoutButtonStates[state][key]);
      }
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    button.state = 'default';

    const handleMouseEnter = () => {
      if (button.state === 'default') {
        updateButtonState(button, 'hover');
        button.state = 'hover';
      }
    };

    const handleMouseLeave = () => {
      if (button.state === 'hover') {
        updateButtonState(button, 'default');
        button.state = 'default';
      }
    };

    const handleClick = () => {
      if (button.state === 'default' || button.state === 'hover') {
        button.classList.add('clicked');
        updateButtonState(button, 'walking1');
        setTimeout(() => {
          button.classList.add('door-slammed');
          updateButtonState(button, 'walking2');
          setTimeout(() => {
            button.classList.add('falling');
            updateButtonState(button, 'falling1');
            setTimeout(() => {
              updateButtonState(button, 'falling2');
              setTimeout(() => {
                updateButtonState(button, 'falling3');
                setTimeout(() => {
                  button.classList.remove('clicked');
                  button.classList.remove('door-slammed');
                  button.classList.remove('falling');
                  updateButtonState(button, 'default');
                  button.state = 'default';
                }, 1000);
              }, parseInt(logoutButtonStates['falling2']['--walking-duration']));
            }, parseInt(logoutButtonStates['falling1']['--walking-duration']));
          }, parseInt(logoutButtonStates['walking2']['--figure-duration']));
        }, parseInt(logoutButtonStates['walking1']['--figure-duration']));
      }
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <button className="logoutButton logoutButton--dark" ref={buttonRef}>
      <svg className="doorway" viewBox="0 0 100 100">
        <path d="M93.4 86.3H58.6c-1.9 0-3.4-1.5-3.4-3.4V17.1c0-1.9 1.5-3.4 3.4-3.4h34.8c1.9 0 3.4 1.5 3.4 3.4v65.8c0 1.9-1.5 3.4-3.4 3.4z" />
        <path className="bang" d="M40.5 43.7L26.6 31.4l-2.5 6.7zM41.9 50.4l-19.5-4-1.4 6.3zM40 57.4l-17.7 3.9 3.9 5.7z" />
      </svg>
      <svg className="figure" viewBox="0 0 100 100">
        <circle cx="52.1" cy="32.4" r="6.4" />
        <path d="M50.7 62.8c-1.2 2.5-3.6 5-7.2 4-3.2-.9-4.9-3.5-4-7.8.7-3.4 3.1-13.8 4.1-15.8 1.7-3.4 1.6-4.6 7-3.7 4.3.7 4.6 2.5 4.3 5.4-.4 3.7-2.8 15.1-4.2 17.9z" />
        <g className="arm1">
          <path d="M55.5 56.5l-6-9.5c-1-1.5-.6-3.5.9-4.4 1.5-1 3.7-1.1 4.6.4l6.1 10c1 1.5.3 3.5-1.1 4.4-1.5.9-3.5.5-4.5-.9z" />
          <path className="wrist1" d="M60.9 61.8L56 56.1l9-7.3 4.9 5.7z" />
        </g>
        <g className="arm2">
          <path d="M47.4 52.3L40.9 41c-.8-1.4-.2-3.3 1.3-4.1 1.4-.8 3.5-.7 4.4.7l7 11.2c.8 1.4.1 3.3-1.4 4.1-1.4.7-3.2.3-4.2-.6z" />
          <path className="wrist2" d="M52.5 59.4l-9.4-5.8 7.4-7.5 7.6 8.8z" />
        </g>
        <g className="leg1">
          <path d="M48.7 78.1c-1.7-1.1-3.7-3.7-1.2-9.5L54 58.4c.6-1.4 2.4-2 3.8-1.3 1.4.6 2 2.3 1.3 3.7L53.4 71c-.2.3-.5 1.2-.9 2.4-.9 2.5-2 5.3-3.8 4.7z" />
          <path className="calf1" d="M53.3 89.6l-4.6-11.3 12.4-4.8 2.5 7.8z" />
        </g>
        <g className="leg2">
          <path d="M36.9 76.3c-1.2.5-2.6-.3-3-1.5-.5-1.3.2-2.8 1.5-3.2l15.3-5c1.3-.5 2.8.2 3.2 1.5.5 1.3-.2 2.8-1.5 3.2L36.9 76.3z" />
          <path className="calf2" d="M38.1 82.9l-1-6.2 11.4-1.5 3.1 6.8z" />
        </g>
      </svg>
      Logout
    </button>
  );
};

export default LogoutButton;
