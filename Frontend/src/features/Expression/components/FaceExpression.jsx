
import { useEffect, useRef, useState } from "react";
import { init, detect } from "../utils/utils";
import "../styles/face-expression.scss";

export default function FaceExpression({ onClick = () => {}}) {
  //dummy function expect kar rahe hai parameters mein...

  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const streamRef = useRef(null);
  // let stream; (iske badle upar wala, coz we need it in utils.js)

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
  
    init({landmarkerRef, videoRef, streamRef, setExpression});

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleOnClick(){
    const expression = detect({landmarkerRef, videoRef, streamRef, setExpression})
    onClick(expression)
    //yeh humne detect mein jo currentExpression return karvaya tha wo expression variable mein save kar dega
    // after detection, hum onclick ko call kar denge with ecpression
    //Home.jsx -> FaceExpression 

  }

  return (
    <div className="expression-card">
      <span className="expression-card__eyebrow">Moodify</span>
      <h2 className="expression-card__heading">Expression Capture</h2>

      <div className="expression-card__frame">
        <span className="expression-card__corner expression-card__corner--tl" />
        <span className="expression-card__corner expression-card__corner--tr" />
        <span className="expression-card__corner expression-card__corner--bl" />
        <span className="expression-card__corner expression-card__corner--br" />

        <video
          ref={videoRef}
          className="expression-card__video"
          playsInline
        />
      </div>

      <p className="expression-card__label">Mood detected</p>
      <p className="expression-card__mood">{expression}</p>

      <button className="expression-card__btn" onClick={handleOnClick}>
        Detect Expression
      </button>
    </div>
  );
}
