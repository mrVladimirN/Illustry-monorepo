import { ReactNode, memo } from 'react';

export type CursorProps = {
  /** Enable cursor blinking animation */
  cursorBlinking?: boolean
  /** Change cursor style */
  cursorStyle?: ReactNode
  /** Change cursor color */
  cursorColor?: string
}

const MemoizedCursor = ({
  cursorBlinking = true,
  cursorStyle = '|',
  cursorColor = 'inherit'
}: CursorProps): JSX.Element => (
    <span
      style={{ color: cursorColor }}
      className={`blinkingCursor ${
        cursorBlinking ? 'blinking' : ''
      }`}
    >
      {cursorStyle}
    </span>
);

export const Cursor = memo(MemoizedCursor);
