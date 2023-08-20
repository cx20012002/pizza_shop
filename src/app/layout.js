import './globals.css'
import {Bangers, Quicksand, Roboto_Condensed} from "next/font/google";
import Nav from "@/app/components/Nav";
import CartMobileIcon from "@/app/components/CartMobileIcon";
import CartProvider from "@/app/context/CartContext";
import CartMobile from "@/app/components/CartMobile";
import CartDesktop from "@/app/components/CartDesktop";
import Footer from "@/app/components/Footer";

const quicksand = Quicksand({
    subsets: ['latin'],
    variable: '--font-quicksand'
});

const bangers = Bangers({
    subsets: ['latin'],
    variable: '--font-bangers',
    weight: ['400']
});

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin'],
    variable: '--font-robotoCondensed',
    weight: ['300', '400', '700']
});


export default function RootLayout({children}) {
    return (
        <CartProvider>
            <html lang="en" className={`${quicksand.variable} ${bangers.variable} ${robotoCondensed.variable}`}>
            <body>
            <Nav/>
            <CartMobileIcon/>
            <CartMobile/>
            {children}
            <CartDesktop/>
            <Footer/>
            </body>
            </html>
        </CartProvider>
    )
}
