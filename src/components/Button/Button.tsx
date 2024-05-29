import classNames from "classnames";
import { ReactNode, useMemo } from "react";
import { match } from "ts-pattern";
import { CircularProgress } from "../CircularProgress/CircularProgress";

export type ButtonVariants = "solid" | "outline" | "ghost";

export function Button({
  children,
  variant = "solid",
  onClick,
  className = "",
  iconRight,
  loading = false,
}: {
  children: ReactNode;
  variant?: ButtonVariants;
  onClick?: () => void;
  className?: string;
  iconRight?: ReactNode;
  loading?: boolean;
}) {
  const classes = useMemo(
    () =>
      classNames(
        "p-1.5 rounded-[5px] min-h-5 min-w-5 text-button flex flex-row justify-between items-center",
        variantClasses(variant),
        className,
        { "!justify-center": loading },
      ),
    [variant, className, loading],
  );
  return (
    <button className={classes} onClick={onClick}>
      {loading ? (
        <CircularProgress className="w-3 h-3" />
      ) : (
        <>
          {children}
          {iconRight}
        </>
      )}
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
