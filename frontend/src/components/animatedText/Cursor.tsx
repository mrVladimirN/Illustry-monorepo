import { ReactNode, memo, JSX } from 'react';

type CursorProps = {
  /** Enable cursor blinking animation */
  cursorBlinking?: boolean;
  /** Change cursor style */
  cursorStyle?: ReactNode;
  /** Change cursor color */
  cursorColor?: string;
};

const MemoizedCursor = ({
  cursorBlinking = true,
  cursorStyle = '|',
  cursorColor = 'inherit'
}: CursorProps): JSX.Element => (
  <span
    style={{ color: cursorColor }}
    className={`blinkingCursor ${cursorBlinking ? 'blinking' : ''}`}
  >
    {cursorStyle}
  </span>
);
const Cursor = memo(MemoizedCursor);

export default Cursor;
export type { CursorProps };
