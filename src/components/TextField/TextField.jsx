import "./TextField.css";

const TextField = ({ label, type, name, value, onChange }) => {
  return (
    <div className="textfield">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextField;
