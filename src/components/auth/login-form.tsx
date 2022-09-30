import Input from "@components/ui/input";
import PasswordInput from "@components/ui/password-input";
import Button from "@components/ui/button";
import {useForm} from "react-hook-form";
import {LoginInputType} from "@framework/auth/use-login";
import {useUI} from "@contexts/ui.context";
import Logo from "@components/ui/logo";
import {useTranslation} from "next-i18next";
import {useLoginMutation} from "../../../generated/graphql";
import { useState, ChangeEvent } from 'react';


const LoginForm: React.FC = () => {
    const {t} = useTranslation();
    const {setModalView, openModal, closeModal} = useUI();
    const [login, {loading}] = useLoginMutation({
        variables: {
            email: '',
            password: ''
        }
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginInputType>();
    
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function onSubmit() {
        login({
            variables: {
                email,
                password
            }
        })
            .then(({data}) => {
                    const refreshToken = data?.tokenCreate?.refreshToken;
                    const csrfToken = data?.tokenCreate?.csrfToken;
                    const token = data?.tokenCreate?.token;

                    csrfToken && sessionStorage.setItem("csrfToken", csrfToken);
                    refreshToken && sessionStorage.setItem("refreshToken", refreshToken);
                    token && sessionStorage.setItem("token", token);
                    console.log(data)
                    console.log("success")
                    closeModal();
            });

    }

    function handleSignUp() {
        setModalView("SIGN_UP_VIEW");
        return openModal();
    }

    function handleForgetPassword() {
        setModalView("FORGET_PASSWORD");
        return openModal();
    }

    return (
        <div
            className="overflow-hidden bg-base-200 text-secondary font-text mx-auto rounded-l-lg w-full sm:w-96 md:w-450px border border-gray-300 py-5 px-5 sm:px-8">
            <div className="text-center mb-6 pt-2.5">
                <div onClick={closeModal}>
                    <Logo/>
                </div>
                <p className="text-sm md:text-base mt-2 mb-8 sm:mb-10">
                    {t("common:login-helper")}
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center"
                noValidate
            >
                <div className="flex flex-col space-y-3.5">
                    <Input
                        labelKey="forms:label-email"
                        type="email"
                        variant="solid"
                        name="email"
                        errorKey={errors.email?.message}
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <PasswordInput
                        value={password}
                        onChange={(event: any) => setPassword(event.target.value)}
                        labelKey="forms:label-password"
                        errorKey={errors.password?.message} 
                        name="password"
                    />
                    <div className="flex items-center justify-center">
                        <div className="flex items-center flex-shrink-0">
                            <label className="switch relative inline-block w-10 cursor-pointer">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="opacity-0 w-0 h-0"
                                    {...register("remember_me")}
                                />
                                <span
                                    className="bg-primary absolute inset-0 transition-all duration-300 ease-in slider round"
                                />
                            </label>
                            <label
                                htmlFor="remember"
                                className="flex-shrink-0 text-sm text-heading ps-3 cursor-pointer"
                            >
                                {t("forms:label-remember-me")}
                            </label>
                        </div>
                        <div className="flex ms-auto">
                            <button
                                type="button"
                                onClick={handleForgetPassword}
                                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
                            >
                                {t("common:text-forgot-password")}
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <Button
                            type="submit"
                            loading={loading}
                            disabled={loading}
                            className="h-11 md:h-12 w-full mt-1.5 bg-primary hover:bg-primary-focus"
                        >
                            {t("common:text-login")}
                        </Button>
                    </div>
                </div>
            </form>
            <div className="text-sm sm:text-base text-body text-center mt-5 mb-1">
                {t("common:text-no-account")}{" "}
                <button
                    type="button"
                    className="text-sm sm:text-base text-heading underline font-bold hover:no-underline focus:outline-none"
                    onClick={handleSignUp}
                >
                    {t("common:text-register")}
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
