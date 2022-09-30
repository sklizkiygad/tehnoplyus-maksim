//import Image from "next/image";
import Text from "@components/ui/text";
import cn from "classnames";
import { useTranslation } from "next-i18next";
const data = {
	title: "АПК \"Столыпино\" \n" +
		"- собственное производство",
	text: "АПК \"Столыпино\" - плодопитомник первого класса. Мы предлагаем элитные саженцы плодово-ягодных культур, а также натуральную яблоневую щепу оптом по низким ценам и в беспроцентную рассрочку!\n" +
		"Саженцы из нашего питомника проходят строгий контроль и отличаются хорошим здоровьем, жизнеспособностью и качеством - живые и мощные корни, крепкие веточки, почки и листья без повреждений.\n" +
		"АПК Столыпино имеет в своем распоряжении порядка 500 га садов и плодово-ягодный питомник. находимся в Республике Башкортостан, в Кушнаренковском районе, село Ахметово. В питомнике сформированными маточники таких культур, как земляника садовая (клубника), смородина, облепиха, бузина, малина, арония, крыжовник, жимолость. ",
	appImage: "/assets/client/about-us.webp",
};

interface Props {
	className?: string;
}

const DownloadApps: React.FC<Props> = ({ className }) => {
	const { title, text, appImage } = data;
	const { t } = useTranslation("common");
	return (
		<div
			className={cn(
				"flex gap-32 items-start rounded-lg bg-base-100 xl:mb-16",
				className
			)}
		>
			<div className="flex-1 w-full sm:w-60 md:w-96 lg:w-auto lg:flex lg:items-center pb-5 md:pb-8 lg:pb-12 xl:pb-16">
				<div className="pb-4 md:pb-6 xl:pb-8 text-start">
					<Text
						variant="largeHeading"
						className="-mt-1 mb-2 md:mb-3 lg:mb-3.5 xl:mb-4 font-days text-secondary"
					>
						{t(`${title}`)}
					</Text>
					<h2
						className="leading-7 sm:leading-8 md:leading-snug xl:leading-relaxed 2xl:leading-snug mb-6 md:mb-8 lg:mb-9 xl:mb-12 2xl:mb-14 lg:pe-20 2xl:pe-0 text-xl font-text text-secondary"
						dangerouslySetInnerHTML={{
							__html: t(`${text}`),
						}}
					/>
					{/*<div className="flex justify-center sm:justify-start space-s-2 md:space-s-3 px-6 sm:px-0">*/}
					{/*	{appButtons?.map((item) => (*/}
					{/*		<Link*/}
					{/*			key={item.id}*/}
					{/*			href={item.slug}*/}
					{/*			className="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80"*/}
					{/*		>*/}
					{/*			<img*/}
					{/*				src={item.appButton}*/}
					{/*				alt={t(`${item.altText}`)}*/}
					{/*				className="w-36 lg:w-44 xl:w-auto"*/}
					{/*				width={item.buttonWidth}*/}
					{/*				height={item.buttonHeight}*/}
					{/*			/>*/}
					{/*		</Link>*/}
					{/*	))}*/}
					{/*</div>*/}
				</div>
			</div>
			<div className="hidden justify-around sm:flex -me-0.5 2xl:-me-1.5 w-60 md:w-72 lg:w-96 xl:w-auto">
				<img
					src={appImage}
					alt={t("text-app-thumbnail")}
					width={440}
					height={430}
				/>
			</div>
		</div>
	);
};

export default DownloadApps;
