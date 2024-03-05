import { HTMLAttributes } from "react";

type CustomIconButtonProps = HTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
};
export default function CustomIconButton({
  icon,
  ...props
}: CustomIconButtonProps) {
  return (
    <button {...props} className="p-2 rounded" onClick={props.onClick}>
      {icon}
    </button>
  );
}
