import Logo from "../assets/spotimood_logo.svg";

export default function Navigation() {
  return (
    <div className="navigation">
      <div className="logo">
        <h1>Spoti</h1>
        <img src={Logo} alt="logo" className="logo_svg" />
        <h1>Mood</h1>
      </div>
    </div>
  );
}
