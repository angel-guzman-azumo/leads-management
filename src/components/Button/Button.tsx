import classNames from "classnames";
import { ReactNode, useMemo } from "react";
import { match } from "ts-pattern";

export type ButtonVariants = "solid" | "outline" | "ghost";

export function Button({ children, variant = "solid" }: { children: ReactNode; variant?: ButtonVariants }) {
  const classes = useMemo(() => classNames("p-1.5 rounded-[5px] min-h-5 min-w-5", variantClasses(variant)), [variant]);
  return <button className={classes}>{children}</button>;
}

function variantClasses(variant: ButtonVariants): string {
  return match(variant)
    .with("solid", () => "bg-btn")
    .with("outline", () => "border border-borderGray")
    .with("ghost", () => "text-borderGray")
    .exhaustive();
}
