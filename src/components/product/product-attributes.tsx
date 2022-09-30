import cn from "classnames";

interface Props {
    className?: string;
    title: string;
    attributes: {
        id: string;
        name: string;
    }[];
    active: { [key: string]: { id: string, name: string } } | null;
    onClick: any;
}

export const ProductAttributes: React.FC<Props> = ({
                                                       className = "mb-4",
                                                       title,
                                                       attributes,
                                                       active,
                                                       onClick,
                                                   }) => {

    console.log(attributes);

    return (
        <div className={className}>
            <h3 className="text-secondary md:text-lg text-heading font-semibold mb-2.5 capitalize">
                {title}
            </h3>
            <ul className="colors flex flex-wrap -me-3">
                {attributes?.map(({id, name}) => (
                    <li
                        key={`${name}-${id}`}
                        className={cn(
                            `cursor-pointer rounded border bg-primary text-base-200 h-9 md:h-11 p-1 mb-2 md:mb-3 me-2 md:me-3 flex justify-center items-center text-heading text-xs md:text-sm font-semibold transition duration-200 ease-in-out hover:border-black hover:bg-primary-focus ${name.split(' ').length > 1 ? 'px-4' : 'w-9 md:w-11' }`,
                            {
                                "border-black": active && active[title].id === id,
                            }
                        )}
                        onClick={() => onClick( { [title]: { id, name} } ) }
                    >
                        {title === "color" ? (
                            <span
                                className="h-full w-full rounded block"
                                style={{backgroundColor: name}}
                            />
                        ) : (
                            name
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
