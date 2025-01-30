import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './style.css';

const CustomEmojiPicker = ({ label = '🔥', onEmojiClick = () => {}, onPickerClose = () => {} }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const pickerRef = useRef(null);

  const handleEmojiClick = (emojiData, event) => {
    onEmojiClick(emojiData, event); // Pass emoji data to parent event handler
    closePicker();
  };

  const togglePicker = () => {
    setPickerVisible((prev) => !prev);
  };

  const closePicker = () => {
    setPickerVisible(false); // Update React state
    onPickerClose?.(); // Trigger the close callback
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the picker
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        closePicker(); // Close picker immediately
      }
    };

    if (isPickerVisible) {
      // Use the capture phase to handle the click as early as possible
      document.addEventListener('click', handleClickOutside, { capture: true });
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true });
    };
  }, [isPickerVisible]);

  return (
    <div  className='pick-emojimain' ref={pickerRef}>
      {/* Button to toggle the Emoji Picker */}
      <button onClick={togglePicker}>{label}</button>

      {/* Emoji Picker */}
      {isPickerVisible && (
        <div className='pick-emoji'>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default CustomEmojiPicker;
