import Link from "@components/ui/link";
import SearchIcon from "@components/icons/search-icon";
import UserIcon from "@components/icons/user-icon";
import MenuIcon from "@components/icons/menu-icon";
import HomeIcon from "@components/icons/home-icon";
import { useUI } from "@contexts/ui.context";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { Drawer } from "@components/common/drawer/drawer";
import { getDirection } from "@utils/get-direction";
import CartButton from "@components/cart/cart-button";
import AuthMenu from "@components/layout/header/auth-menu";
import MobileMenu from "@components/layout/header/mobile-menu";

interface MobileNavigationProps{
	menu: any;
}

const BottomNavigation: React.FC<MobileNavigationProps> = ({menu}) => {
	const {
		openSidebar,
		closeSidebar,
		displaySidebar,
		setDrawerView,
		openSearch,
		openModal,
		setModalView,
		isAuthorized,
	} = useUI();

	function handleLogin() {
		setModalView("LOGIN_VIEW");
		return openModal();
	}
	function handleMobileMenu() {
		setDrawerView("MOBILE_MENU");
		return openSidebar();
	}

	const { locale } = useRouter();
	const dir = getDirection(locale);
	const contentWrapperCSS = dir === "ltr" ? { left: 0 } : { right: 0 };

	return (
		<>
			<div className="md:hidden fixed z-10 bottom-0 flex items-center justify-between shadow-bottomNavigation text-secondary font-text 5 bg-base-200  w-full h-14 sm:h-16 px-4">
				<button
					aria-label="Menu"
					className="menuBtn flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
					onClick={handleMobileMenu}
				>
					<MenuIcon />
				</button>
				<button
					className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
					onClick={openSearch}
					aria-label="search-button"
				>
					<SearchIcon />
				</button>
				<Link href="/" className="flex-shrink-0">
					<HomeIcon />
				</Link>
				<CartButton />
				<AuthMenu
					isAuthorized={isAuthorized}
					href={ROUTES.ACCOUNT}
					className="flex-shrink-0"
					btnProps={{
						className: "flex-shrink-0 focus:outline-none",
						children: <UserIcon />,
						onClick: handleLogin,
					}}
				>
					<UserIcon />
				</AuthMenu>
			</div>
			<Drawer
				placement={dir === "rtl" ? "right" : "left"}
				open={displaySidebar}
				onClose={closeSidebar}
				handler={false}
				showMask={true}
				level={null}
				contentWrapperStyle={contentWrapperCSS}
			>
				<MobileMenu menu={menu}/>
			</Drawer>
		</>
	);
};

export default BottomNavigation;
