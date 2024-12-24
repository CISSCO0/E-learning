interface ButtonProps {
  label: string;
  onClick?: () => Promise<void> | void; // Allow async function
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
