import { ReactNode } from 'react';

export interface IButtonProps {
  content: string;
  type: 'submit' | 'reset' | 'button';
  icon?: ReactNode;
  disabled?: boolean;
  width?: number;
  height?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
