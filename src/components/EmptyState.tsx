import type { ReactNode } from "react";

interface Props {
  message: string;
  children?: ReactNode;
}

export default function EmptyState({ message, children }: Props) {
  return (
    <div className="state">
      <p>∅ {message}</p>
      {children}
    </div>
  );
}
