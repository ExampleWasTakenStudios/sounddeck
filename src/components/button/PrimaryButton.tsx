import clsx from 'clsx';
import { ReactNode } from 'react';

interface PrimaryButtonProps {
  content: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const PrimaryButton = ({ content, icon, disabled, onClick }: PrimaryButtonProps) => {
  const css = clsx(
    'bg-green text-white px-3 py-2 rounded flex flex-row justify-center items-center gap-1 text-center cursor-pointer active:bg-green/70',
    disabled && 'opacity-75 cursor-not-allowed active:bg-green/100',
  );

  return (
    <button className={css} onClick={(event) => !disabled && onClick(event)}>
      {icon && <div className="align-middle">{icon}</div>}
      <p>{content}</p>
    </button>
  );
};
