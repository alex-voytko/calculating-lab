import { useContext, useEffect } from "react";
import { appContext } from "../App";

import Icon from "./Icon";
import { DarkTheme } from "../models";

function Toggler() {
  const { setIsDarkTheme, isDarkTheme } = useContext(appContext);

  return (
    <div className="toggler-container">
      <input
        type="checkbox"
        id="dark-mode-toggle"
        onChange={() => setIsDarkTheme(!isDarkTheme)}
        checked={isDarkTheme}
      />
      <label className="toggle-label" htmlFor="dark-mode-toggle">
        <Icon name="moon" />
        <Icon name="sun" />
      </label>
    </div>
  );
}

export default Toggler;
