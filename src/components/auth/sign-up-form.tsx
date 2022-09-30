import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import {useForm} from "react-hook-form";
import Logo from "@components/ui/logo";
import {useUI} from "@contexts/ui.context";
import {SignUpInputType} from "@framework/auth/use-signup";
import Link from "@components/ui/link";
import {ROUTES} from "@utils/routes";
import {useTranslation} from "next-i18next";
// @ts-ignore
import {useCreateUserMutation} from "../../../generated/graphql";
import { ChangeEvent, useState } from "react";
import axios from "axios";

const SignUpForm: React.FC = () => {

    const {t} = useTranslation();
    const [signUp, {loading}] = useCreateUserMutation({
        variables: {
            firstName: '',
            email: '',
            password: ''
        }
    });
    const {setModalView, openModal, closeModal} = useUI();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignUpInputType>();

    function handleSignIn() {
        setModalView("LOGIN_VIEW");
        return openModal();
    }

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    function onSubmit({name, email, password}: SignUpInputType) {
        signUp({
                variables: {
                    firstName: name,
                    email,
                    password,
                }
            }
        ).then(({data}) => {
            if (!data?.accountRegister?.accountErrors.length){
                handleSignIn();
            }
        });

        axios.post("https://backend.otlivant.com/graphql/", {
                input: {
                    name: `${name}`,
                    email: `${email}`,
                    password: `${password}`,
                    redirectUrl: "https://otlivant.com",
                    channel: "default-channel",
                  }
        });
        window.location.href="/";
        
    }

    return (
        <div className="py-5 px-5 sm:px-8 bg-base-200 text-secondary font-text mx-auto rounded-l-lg w-full sm:w-96 md:w-450px border border-gray-300">
            <div className="text-center mb-6 pt-2.5">
                <div onClick={closeModal}>
                    <Logo/>
                </div>
                <p className="text-sm md:text-base text-body mt-2 mb-8 sm:mb-10">
                    {t("common:registration-helper")}{" "}
                    <Link
                        href={ROUTES.TERMS}
                        className="text-heading underline hover:no-underline focus:outline-none"
                    >
                        {t("common:text-terms")}
                    </Link>{" "}
                    &amp;{" "}
                    <Link
                        href={ROUTES.POLICY}
                        className="text-heading underline hover:no-underline focus:outline-none"
                    >
                        {t("common:text-policy")}
                    </Link>
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center"
                noValidate
            >
                <div className="flex flex-col space-y-4">
                    <Input
                        labelKey="forms:label-name"
                        type="text"
                        variant="solid"
                        {...register("name", {
                            required: "forms:name-required",
                        })}
                        errorKey={errors.name?.message}
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <Input
                        labelKey="forms:label-email"
                        type="email"
                        variant="solid"
                        {...register("email", {
                            required: `${t("forms:email-required")}`,
                            pattern: {
                                value:
                                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: t("forms:email-error"),
                            },
                        })}
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        errorKey={errors.email?.message}
                    />
                    <PasswordInput
                        labelKey="forms:label-password"
                        errorKey={errors.password?.message}
                        {...register("password", {
                            required: `${t("forms:password-required")}`,
                        })}
                    />
                    <div className="relative">
                        <Button
                            type="submit"
                            loading={loading}
                            disabled={loading}
                            className="h-11 md:h-12 w-full mt-2 bg-primary hover:bg-primary-focus"
                        >
                            {t("common:text-register")}
                        </Button>
                    </div>
                </div>
            </form>
            <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
                {t("common:text-have-account")}{" "}
                <button
                    type="button"
                    className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
                    onClick={handleSignIn}
                >
                    {t("common:text-login")}
                </button>
            </div>
        </div>
    );
};

export default SignUpForm;