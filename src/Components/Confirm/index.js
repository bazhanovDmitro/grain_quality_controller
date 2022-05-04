import HintCard from "../HintCard";
import Buttons from "./Buttons";

export default function Confirm({
  onDecline,
  onAccept,
  acceptText,
  declineText,
  declineStyle,
  acceptStyle,

  header,
  text,
  highlighted,
}) {
  return (
    <HintCard header={header} text={text} highlighted={highlighted}>
      <Buttons
        onAccept={onAccept}
        onDecline={onDecline}
        acceptText={acceptText}
        declineText={declineText}
        declineStyle={declineStyle}
        acceptStyle={acceptStyle}
      />
    </HintCard>
  );
}
