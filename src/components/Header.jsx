import "./Header.css";
const Header = ({ title, leftChild, rightChild, logout }) => {
  return (
    <header className="Header">
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{title}</div>
      <div className="header_right">{rightChild}</div>
      <div className="header_logout">{logout}</div>
    </header>
  );
};

export default Header;
