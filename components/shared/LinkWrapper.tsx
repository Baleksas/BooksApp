import Link from "next/link";
import { ReactNode } from "react";

interface LinkWrapperProps {
  href: string;
  children: ReactNode;
  [key: string]: any; // To allow any other props
}

const LinkWrapper = ({ href, children, ...props }: LinkWrapperProps) => {
  if (props.disabled) {
    return (
      <button {...props} className="btn btn-primary mt-2">
        {children}
      </button>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default LinkWrapper;
