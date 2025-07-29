import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { GrGallery } from "react-icons/gr";
import "./style.css";

export default function EmojiPickerComponent({emoji,setEmoji}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* {
            isOpen?''
        } */}
      <div className="emoji-picker_div" onClick={() => setIsOpen(!isOpen)}>
        {!emoji ? (
          <>
            <GrGallery />

            <p className="m-0 ms-2">Pick Icon</p>
          </>
        ) : (
          <>
            {/* {<p className="m-0 fs-2">{emoji}</p>} */}
            <img src={emoji}  alt="" />
            <p className="m-0 ms-2">Change Icon</p>
          </>
        )}
        {isOpen && (
          <div className="emoji-picker_box">
            <EmojiPicker onEmojiClick={(data) => setEmoji(data.imageUrl)} />
          </div>
        )}
      </div>
    </>
  );
}
