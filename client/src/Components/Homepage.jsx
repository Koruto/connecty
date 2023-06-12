import { ReactComponent as Red } from '../Assets/Red.svg';
import { useState } from 'react';

export default function App() {
  const [visible, setVisible] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const handleClick = () => {
    setVisible(1);
  };

  const handleCopyClick = () => {
    const textToCopy = 'Text to be copied';
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 1500);
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      });
  };

  return (
    <>
      {showNotification && (
        <div className="absolute text-center m-5 p-1 bg-green-900 rounded">
          Text copied!
        </div>
      )}
      <div className="font-arvo text-[#F0E7E6] text-center p-10">
        <h2 className="text-8xl font-bold leading-none">Connect 4</h2>
        <p className="text-[40px] leading-normal font-light">
          Lockdown has never been so fun!
        </p>
      </div>
      <div className="flex justify-center">
        <Red className="m-6" />
        <Red className="m-6" />
        <Red className="m-6" />
        <Red className="m-6" />
      </div>
      <div className="flex justify-center items-center ">
        <button
          className={`bg-transparent border border-gray-300 rounded-md text-red-500 overflow-hidden py-2 px-20 m-20 text-4xl font-rajdhani border-1 hover:bg-[#EC4242] hover:text-[#F0E7E6] hover:border-transparent transition-all ${
            visible === 1 ? 'hidden' : ''
          }`}
          onClick={handleClick}
        >
          PLAY
        </button>
        <div
          className={`font-arvo text-[#F0E7E6] text-center py-2 px-20 m-20 ${
            visible === 0 ? 'hidden' : ''
          }`}
        >
          <span>Share this link with others to play together:</span>
          <button
            className="bg-transparent border border-gray-300 rounded-md text-red-500 overflow-hidden py-1 px-2 m-1 text-xl font-rajdhani border-1 hover:bg-[#EC4242] hover:text-[#F0E7E6] hover:border-transparent transition-all"
            onClick={handleCopyClick}
          >
            Copy to Clipboard
          </button>
          <span>. Enjoy the game together!</span>
        </div>
      </div>
    </>
  );
}
