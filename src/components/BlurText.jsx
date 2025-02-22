"use client";

import Textblureffect from "./ui/textblureffect";

const BlurText = ({ text, className = "", animateBy = "words", ...props }) => {
  return (
    <Textblureffect
      text={text}
      className={className}
      animateBy={animateBy}
      {...props}
    />
  );
};

export default BlurText;
