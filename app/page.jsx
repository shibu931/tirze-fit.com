import ContactForm from "@/components/Common/ContactForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <div className="relative banner-img">
          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] z-10 banner-text">
            <h1 className="text-center font-bold md:font-extrabold text-3xl md:text-5xl uppercase text-white tracking-wider">Title</h1>
            <div className="flex space-x-2 mt-5">
              <Link className="banner-btn text-white  px-4 py-1.5 font-semibold hover:cursor-pointer shadow-lg shadow-gray-900 bg-blue-700 hover:bg-blue-800" href="/shop">
              Przeglądaj sklep
              </Link>
            </div>
          </div>
          <Image
            src={'/assets/banner.webp'}
            width={1000}
            height={667}
            alt=""
            className="-z-10 w-full h-[600px] object-cover object-top"
          />
        </div>
      </section>

      <ContactForm/>
    </main>
  );
}
