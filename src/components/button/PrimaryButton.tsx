import clsx from 'clsx';
import { ReactNode } from 'react';

interface PrimaryButtonProps {
  content: string;
  type: 'submit' | 'reset' | 'button';
  icon?: ReactNode;
  disabled?: boolean;
  width?: number;
  height?: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const PrimaryButton = ({ content, type, icon, disabled, width, height, onClick }: PrimaryButtonProps) => {
  const css = clsx(
    'bg-green text-white px-3 py-2 rounded flex flex-row justify-center items-center gap-1 text-center cursor-pointer',
    disabled && 'opacity-75 cursor-not-allowed active:bg-green',
    !disabled && 'active:bg-green/70',
  );

  return (
    <button
      type={type}
      className={css}
      onClick={(event) => !disabled && onClick(event)}
      style={{ width: width, height: height }}
    >
      {icon && <div className="align-middle">{icon}</div>}
      <p>{content}</p>
    </button>
  );
};
