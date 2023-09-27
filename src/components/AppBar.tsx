import Toggler from "./Toggler";

function AppBar() {
  return (
    <header className="app-bar">
      <div className="logo">
        calculating<span>Lab</span>
      </div>
      <Toggler />
    </header>
  );
}

export default AppBar;
