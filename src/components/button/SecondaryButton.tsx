import clsx from 'clsx';
import { ReactNode } from 'react';

interface SecondaryButtonProps {
  content: string;
  icon?: ReactNode;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const SecondaryButton = ({ content, icon, disabled, onClick }: SecondaryButtonProps) => {
  const css = clsx(
    'bg-purple text-white px-3 py-2 rounded flex flex-row justify-center items-center gap-1 text-center cursor-pointer',
    disabled && 'opacity-75 cursor-not-allowed active:bg-purple',
    !disabled && 'active:bg-purple/70',
  );

  return (
    <button className={css} onClick={(event) => !disabled && onClick(event)}>
      {icon && <div className="align-middle">{icon}</div>}
      <p>{content}</p>
    </button>
  );
};
