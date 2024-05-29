import classNames from "classnames";
import { ReactNode, useMemo } from "react";
import { match } from "ts-pattern";

export type ButtonVariants = "solid" | "outline" | "ghost";

export function Button({
  children,
  variant = "solid",
  onClick,
  className = "",
  iconRight,
}: {
  children: ReactNode;
  variant?: ButtonVariants;
  onClick?: () => void;
  className?: string;
  iconRight?: ReactNode;
}) {
  const classes = useMemo(
    () =>
      classNames(
        "p-1.5 rounded-[5px] min-h-5 min-w-5 text-button flex flex-row justify-between items-center",
        variantClasses(variant),
        className,
      ),
    [variant, className],
  );
  return (
    <button className={classes} onClick={onClick}>
      {children}
      {iconRight}
    </button>
  );
}

function variantClasses(variant: ButtonVariants): string {
  return match(variant)
    .with("solid", () => "bg-btn")
    .with("outline", () => "border border-borderGray")
    .with("ghost", () => "text-borderGray")
    .exhaustive();
}
