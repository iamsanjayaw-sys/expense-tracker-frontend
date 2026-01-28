import "./TextField.css";

export default function TextField({
  label,
  name,
  type = "text",
  value,
  onChange,
}) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
