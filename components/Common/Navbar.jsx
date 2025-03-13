'use client'
import { NavigationMenuContent, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { RiMenu3Line } from "react-icons/ri";
import { websiteName } from "@/lib/constants/commonName"
import { navLinks } from "@/lib/constants/links"
import { LuSearch } from "react-icons/lu";
import Cart from "./Cart"

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const navbarRef = useRef(null);
    const pathname = usePathname();
    const [searchBox, setSearchBox] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (navbarRef.current) {
                const navbarHeight = navbarRef.current.offsetHeight;
                const scrollPosition = window.scrollY;
                setIsSticky(scrollPosition >= navbarHeight);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header ref={navbarRef} className={`text-neutral-900 mx-auto py-4 transition-all duration-300 fixed w-full z-50 bg-white ${isSticky ? 'shadow-lg fixed' : 'shadow-none'}`}>
            <div className="container items-center mx-auto flex justify-between px-4">
                <div>
                    <Link className="text-xl font-bold focus-visible:ring-1 focus:bg-accent focus:text-accent-foreground focus:ring-blue-100 focus:outline-blue-100 focus:rounded p-1 focus-visible:outline-1" href={'/'}>Tirzepatyd<span className="text-2xl text-blue-400">.</span></Link>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="hidden md:block"><NavMenu pathname={pathname} /></div>
                    <div className="md:hidden order-3 mt-1 ms-1"><MobileNav pathname={pathname} /></div>
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div onClick={() => (setSearchBox(!searchBox))} className="hover:bg-blue-100 rounded p-1 hover:shadow-lg hover:border border-blue-200 hover:text-blue-700 hover:cursor-pointer"><LuSearch className="text-xl mt-1" /></div>
                            <form
                                action=""
                                className={`absolute bg-white -z-10 rounded-full search-box mt-2 p-1 shadow-md border border-gray-500 w-[96vw] -right-12 md:right-0 md:w-72 ${searchBox ? 'active' : ''}`} // Styled form
                            >
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search Products"
                                        className="p-1 flex-grow mr-2 focus:outline-none focus:ring-none ps-3 focus:border-blue-300" // Styled input
                                    />
                                    <button type="submit" className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                                        <LuSearch className="text-xl" />
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <Cart />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const MobileNav = ({ pathname }) => {
    const [open, setOpen] = useState(false)
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button variant="outline" className="hover:cursor-pointer hover:bg-neutral-200 rounded hover:shadow transition-all duration-200 p-2 "><RiMenu3Line className="text-2xl" /></button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{websiteName}</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                <NavMenu pathname={pathname} setOpen={setOpen} />
                <SheetFooter>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

const NavMenu = ({ setOpen, pathname }) => {
    return (
        <NavigationMenu className="w-full md:max-w-max">
            <NavigationMenuList className="flex flex-col lg:flex-row space-y-2 md:space-y-0 lg:space-x-2">
                {navLinks?.map((link) => (
                    <NavigationMenuItem key={link.slug} >
                        {link?.subLinks ? (
                            <>
                                <NavigationMenuTrigger className={`${link.slug === pathname ? '!text-blue-700 active' : ''} nav-link`}>{link.label}
                                    <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-blue-700 transition-all duration-300 grouphover:w-full" />
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className={'bg-white'}>
                                    <ul className="w-[240px]">
                                        {link?.subLinks && link?.subLinks?.map((subLink) => (
                                            <li key={subLink.label}>
                                                <NavigationMenuLink asChild>
                                                    <Link className={`relative block text-center font-medium hover:text-blue-700 ${link.slug === pathname ? 'text-blue-700' : ''
                                                        }`} href={subLink.slug}>{subLink.label}
                                                        <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-blue-700 transition-all duration-300 grouphover:w-full" />
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <Link href={link.slug} onClick={() => setOpen(false)} className={`nav-link relative block `} legacyBehavior={true} passHref>
                                <NavigationMenuLink
                                    className={`transition-colors nav-link duration-300 ${link.slug === pathname ? '!text-blue-700 active' : ''} ${navigationMenuTriggerStyle()}`}
                                >
                                    {link.label}
                                    <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-blue-700 transition-all duration-300 under nav-underline" />
                                </NavigationMenuLink>
                            </Link>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar