import style from "../Assets/Styles/aboutPage.module.scss";
import { useContext } from "react";
import { UserContext } from "../App";
import { ReactComponent as Office } from "../Assets/Svg/Office.svg";
import { HOW_TO_USE, PURPOSE, PURPOSE_TEXT } from "../Constants/text";
import { TIPS } from "../Utils/objects/userTips";
import InstructionList from "../Components/InstructionList";

export default function About() {
  const { role } = useContext(UserContext);

  return (
    <main className={style.about}>
      <div className={style.svgContainer}>
        <Office className={style.OfficeSvg} />
      </div>
      <div className={style.textArea}>
        <h2>{PURPOSE}</h2>
        <p>{PURPOSE_TEXT}</p>
        <h2>{HOW_TO_USE}</h2>
        <InstructionList items={TIPS[role]} />
      </div>
    </main>
  );
}
