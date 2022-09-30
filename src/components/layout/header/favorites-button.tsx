import {MenuProps} from "./header-menu";
import Link from "@components/ui/link";


 const FavoritesButton: React.FC<MenuProps> = () => {

  return (
        <Link href="/category/favorites">
            <img src="/assets/images/favorites_icon.png" alt="" />
        </Link>
  )
}
export default FavoritesButton;