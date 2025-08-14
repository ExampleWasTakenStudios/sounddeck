import clsx from 'clsx';
import { IButtonProps } from './IButtonProps';

export const SecondaryButton = ({ content, type, icon, disabled, width, height, onClick }: IButtonProps) => {
  const css = clsx(
    'bg-secondary text-black px-3 py-2 rounded flex flex-row justify-center items-center gap-1 text-center cursor-pointer',
    disabled && 'opacity-75 cursor-not-allowed active:bg-secondary',
    !disabled && 'active:bg-secondary/70',
  );

  return (
    <button
      type={type}
      className={css}
      onClick={(event) => !disabled && onClick && onClick(event)}
      style={{ width: width, height: height }}
    >
      {icon && <div className="align-middle">{icon}</div>}
      <p>{content}</p>
    </button>
  );
};
