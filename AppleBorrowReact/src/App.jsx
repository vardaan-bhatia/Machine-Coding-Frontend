import { useState } from "react";
import Basket from "./Basket";
import Arrow from "./Arrow";
import "./index.css";

function App() {
  const [totalApples, setTotalApples] = useState(10);
  const [secondBasket, setSecondBasket] = useState(0);

  const moveToBasket2 = () => {
    if (totalApples > 0) {
      setTotalApples(totalApples - 1);
      setSecondBasket(secondBasket + 1);
    }
  };

  const moveToBasket1 = () => {
    if (secondBasket > 0) {
      setTotalApples(totalApples + 1);
      setSecondBasket(secondBasket - 1);
    }
  };

  const getHeadingText = () => {
    if (totalApples === 0) {
      return "There are 0 apples in Basket 1.";
    }
    if (secondBasket === 0) {
      return "There are 0 apples in Basket 2.";
    }
    return "Apple Count";
  };

  return (
    <div className="container">
      <section>
        <Basket label="Basket 1" apples={totalApples} />

        <div className="arrow-container">
          <Arrow direction="left" onClick={moveToBasket1} />
          <Arrow direction="right" onClick={moveToBasket2} />
        </div>

        <Basket label="Basket 2" apples={secondBasket} />
      </section>
      <h2 className="heading">{getHeadingText()}</h2>
    </div>
  );
}

export default App;
