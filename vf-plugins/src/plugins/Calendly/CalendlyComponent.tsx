import React from "react";
import { PopupButton } from "react-calendly";

interface CalendlyProps {
  link: string;
}
export const Calendly: React.FC<CalendlyProps> = ({ ...props }) => {
  return (
    <PopupButton
      url={`${props.link}`}
      rootElement={document.getElementById(window.voiceflow.div.id)}
      text="Click here to schedule!"
    />
  );
};
