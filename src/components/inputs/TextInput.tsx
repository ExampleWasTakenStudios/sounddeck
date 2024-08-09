interface TextInputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export const TextInput = ({ onChange, disabled }: TextInputProps) => {
  return (
    <input
      className="text-center bg-transparent outline-none border-b transition-colors focus-visible:border-b-green"
      type="text"
      disabled={disabled}
      onChange={onChange}
    />
  );
};
