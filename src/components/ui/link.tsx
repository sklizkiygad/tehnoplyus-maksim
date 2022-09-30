import { LoaderComponent } from "@components/loader/loader";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export const turnOnLoader = () => {
  LoaderComponent.setLoadingState(true);
}

const Link: React.FC<NextLinkProps & { className?: string }> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a {...props} onClick={turnOnLoader}>{children} </a>
    </NextLink>
  );
};

export default Link;
