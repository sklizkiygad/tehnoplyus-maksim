import cn from "classnames";
interface Props {
	className?: string;
	children?: any;
	el?: HTMLElement;
	clean?: boolean;
}

const Container: React.FC<Props> = ({
	children,
	className,
	clean,
}) => {
	const rootClassName = cn(className, {
		"mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16": !clean,
	});

	return <div className={rootClassName}>{children}</div>;
};

export default Container;
