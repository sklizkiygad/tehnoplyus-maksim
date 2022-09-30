import {NextSeo} from "next-seo";
import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";
import CookieBar from "@components/common/cookie-bar";
import {useAcceptCookies} from "@utils/use-accept-cookies";
import Button from "@components/ui/button";
import {useTranslation} from "next-i18next";
import {useCategoriesQuery} from "../../../generated/graphql";
import Loader, { LoaderComponent } from "@components/loader/loader";
import SubHeader from "./header/sub-header";

const Layout: React.FC = ({children}) => {
    const {acceptedCookies, onAcceptCookies} = useAcceptCookies();
    const {t} = useTranslation("common");

    const {data} = useCategoriesQuery();

    if(data !== undefined){
        LoaderComponent.setLoadingState(false);
    }

    const menu = data && data.categories && data.categories.edges.map(({node: {id, name, slug, children}}) => {
        return {
            id,
            path: `/category/${slug}`,
            label: name,
            columns: children && children.edges.length && children.edges.map(
                (
                    {
                        node: {
                            id,
                            name,
                            slug,
                            children
                        }
                    }
                ) => {
                    return {
                        columnItems: [
                            {
                                id,
                                path: `/category/${slug}`,
                                label: name,
                                columnItemItems: children && children.edges.length && children.edges.map(
                                    (
                                        {
                                            node: {
                                                id,
                                                name,
                                                slug
                                            }
                                        }
                                    ) => {
                                        return {
                                            id,
                                            path: `/search?category=${slug}`,
                                            label: name
                                        }
                                    })
                            }
                        ]
                    }
                })
        }
    }) || [];
    


    const mobileMenu = data?.categories?.edges.map(({node: {id, name, slug, children, level}}) => {
        return {
            id,
            path: `/category/${slug}`,
            label: name,
            level,
            subMenu: children?.edges?.map(({node: {id, name, slug, children}}) => {
                return {
                    id,
                    path: `/category/${slug}`,
                    label: name,
                    subMenu: children?.edges?.map(({node: {id, name, slug}}) => {
                        return {
                            id,
                            path: `/search?category=${slug}`,
                            label: name,
                            level
                        }
                    })
                }
            })
        }
    })

    return (
        <div className="flex flex-col min-h-screen">
            <Loader />
            <NextSeo
                additionalMetaTags={[
                    {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1.0",
                    },
                    {
                        name: "theme-color",
                        content:"#926eae",
                    },
                    {
                        name: "msapplication-navbutton-color",
                        content:"#926eae",
                    },
                    {
                        name: "apple-mobile-web-app-capable",
                        content:"#926eae",
                    },
                    {
                        name: "apple-mobile-web-app-status-bar-style",
                        content:"#926eae",
                    },
                    {
                        name: "viewport",
                        content:"ya-title=#926eae,ya-dock=fade"
                    },
                ]}
                title="Отливант - элитные духи"
                description="Коллекция впечатляющих духов для него и неё"
                canonical="https://otlivant.com/"
                openGraph={{
                    url: "https://otlivant.com",
                    title: "Отливант - элитные духи",
                    description:
                        "Коллекция впечатляющих духов для него и неё",
                    images: [
                        {
                            url: "/assets/images/og-image-01.png",
                            width: 800,
                            height: 600,
                            alt: "Og Image Alt",
                        },
                        {
                            url: "/assets/images/og-image-02.png",
                            width: 900,
                            height: 800,
                            alt: "Og Image Alt Second",
                        },
                    ],
                }}
            />
            <SubHeader/>
            <Header menu={menu}/>
            <main
                className="relative flex-grow"
                style={{
                    minHeight: "-webkit-fill-available",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {children}
            </main>
            <Footer/>
            <MobileNavigation menu={mobileMenu}/>
            <Search/>
            <CookieBar
                title={t("text-cookies-title")}
                hide={acceptedCookies}
                action={
                    <Button onClick={() => onAcceptCookies()} variant="slim" className="bg-primary">
                        {t("text-accept-cookies")}
                    </Button>
                }
            />
        </div>
    );
};

export default Layout;
