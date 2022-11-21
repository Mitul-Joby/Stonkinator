import Loading from "./Loading.component";
import HomeNavbar from "./HomeNavbar.component";
import LandNavbar from "./LandNavbar.component";
import SignInCard from "./SignInCard.component";
import SignUpCard from "./SignUpCard.component";
import SignOutButton from "./SignOutButton.component";
import StockCarousel from "./StockCarousel.component";

const responsive = {
    xtraLarge: {
        breakpoint: { max: 4000, min: 2000 },
        items: 5,
    },
    largerDesktop: {
        breakpoint: { max: 2000, min: 1500 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 1500, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export { Loading, HomeNavbar, LandNavbar, SignInCard, SignUpCard, SignOutButton, StockCarousel, responsive };