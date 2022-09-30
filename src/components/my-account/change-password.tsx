import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import {
	ChangePasswordInputType,
} from "@framework/customer/use-change-password";
import { useTranslation } from "next-i18next";
import {useChangePassMutation} from "../../../generated/graphql";
import {useRouter} from "next/router";

const defaultValues = {
	oldPassword: "",
	newPassword: "",
};

const ChangePassword: React.FC = () => {
	const [changePass, {loading}] = useChangePassMutation();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ChangePasswordInputType>({
		defaultValues,
	});
	function onSubmit(input: ChangePasswordInputType) {
		changePass({variables: { oldPassword: input.oldPassword, newPassword: input.newPassword }})
			.then(({errors}) => {
				if (!errors?.length){
					router.push('/my-account');
				}
			});
	}
	const { t } = useTranslation();
	return (
		<>
			<h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
				{t("common:text-change-password")}
			</h2>
			<motion.div
				layout
				initial="from"
				animate="to"
				exit="from"
				//@ts-ignore
				variants={fadeInTop(0.35)}
				className={`w-full flex  h-full lg:w-8/12 flex-col`}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="w-full mx-auto flex flex-col justify-center "
				>
					<div className="flex flex-col space-y-3">
						<PasswordInput
							labelKey="forms:label-old-password"
							errorKey={errors.oldPassword?.message}
							{...register("oldPassword", {
								required: "forms:password-old-required",
							})}
							className="mb-4"
						/>
						<PasswordInput
							labelKey="forms:label-new-password"
							errorKey={errors.newPassword?.message}
							{...register("newPassword", {
								required: "forms:label-new-password",
							})}
							className="mb-4"
						/>

						<div className="relative">
							<Button
								type="submit"
								loading={loading}
								disabled={loading}
								className="h-13 mt-3"
							>
								{t("common:text-change-password")}
							</Button>
						</div>
					</div>
				</form>
			</motion.div>
		</>
	);
};

export default ChangePassword;
