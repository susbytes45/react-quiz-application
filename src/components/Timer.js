import { useEffect, useState } from "react";
function Timer({ dispatch }) {
  const initialvalue = 60 * 0.2;
  const [timer, settimer] = useState(initialvalue);
  useEffect(
    function () {
      const intervalid = setInterval(() => {
        settimer((previousvalue) => {
          if (previousvalue === 0) {
            clearInterval(intervalid);
            dispatch({ type: "finished" });
            return 0;
          } else {
            return previousvalue - 1;
          }
        });
      }, 1000);

      return () => clearInterval(intervalid);
    },
    [dispatch]
  );

  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;
  return (
    <div>
      <p>Countdown Timer:</p>
      <p>{` ${minutes}m ${seconds}s`}</p>
    </div>
  );
}

export default Timer;
