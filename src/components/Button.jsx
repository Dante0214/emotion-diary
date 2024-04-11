import "./Button.css";
const Button = ({ text, type, onClick }) => {
  const buttonType = type === "submit" ? "submit" : "button";
  return (
    <button
      onClick={onClick}
      type={buttonType}
      className={`Button Button_${type}`}
    >
      {text}
    </button>
  );
};
export default Button;
