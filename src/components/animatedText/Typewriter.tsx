'use client'
import { Cursor, CursorProps } from "./Cursor";
import { TypewriterProps, useTypewriter } from "./hooks/useTypewriting";

type ComponentProps = {
  /** Show / Hide the cursor */
  cursor?: boolean;
} & TypewriterProps &
  CursorProps;

/**
 * A Simple React Component for adding a nice Typewriter effect to your project.
 */
export const Typewriter = ({
  words = [],
  loop = 1,
  typeSpeed = 80,
  deleteSpeed = 50,
  delaySpeed = 1500,
  cursor = false,
  cursorStyle = "|",
  cursorColor = "inherit",
  cursorBlinking = true,
  onLoopDone,
  onType,
  onDelay,
  onDelete,
}: ComponentProps): JSX.Element => {
  const [text] = useTypewriter({
    words,
    loop,
    typeSpeed,
    deleteSpeed,
    delaySpeed,
    onLoopDone,
    onType,
    onDelay,
    onDelete,
  });

  return (
    <>
      <span>{text}</span>
      {cursor && (
        <Cursor
          cursorStyle={cursorStyle}
          cursorColor={cursorColor}
          cursorBlinking={cursorBlinking}
        />
      )}
    </>
  );
};
