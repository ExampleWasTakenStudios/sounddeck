interface TextInputProps {
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const TextInput = ({ placeholder, onChange, disabled }: TextInputProps) => {
  return (
    <input
      className="text-center bg-transparent outline-none border-b transition-colors focus-visible:border-b-green"
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
    />
  );
};
