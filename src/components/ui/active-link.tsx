import { useRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";

const ActiveLink = ({ children, activeClassName, href, ...props }: any) => {
	const { asPath } = useRouter();
	const pathname = asPath ;
	const child = Children.only(children);
	const childClassName = child.props.className || "";

	const className =
		pathname === href
			? `${activeClassName} ${childClassName}`.trim()
			: childClassName;

	const newProps = {...props, className: {...props.className, className } };

	return (
		<Link href={href} {...newProps}>
			{React.cloneElement(child, {
				className: className || null,
			})}
		</Link>
	);
};

export default ActiveLink;
