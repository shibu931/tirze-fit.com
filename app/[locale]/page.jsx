import ContactForm from "@/components/Common/ContactForm";
import Image from "next/image";
import { Link } from '@/i18n/navigation';
import { getLocale, getTranslations } from "next-intl/server";
import ShopPage from "@/components/ShopPage/ShopPage";
export default async function Home() {
  const locale = await getLocale()
  const t = await getTranslations('HomePage');
  return (
    <main>
      <section>
        <div className="relative banner-img">
          <div className="absolute top-1/2 left-1/2 w-full lg:w-3/4 -translate-x-[50%] -translate-y-[50%] z-10 banner-text text-center">
            <h1 className="text-center font-bold md:font-extrabold text-xl sm:text-2xl md:text-4xl uppercase text-white tracking-wider w-full">{t('title')}</h1>
            <Link className="banner-btn inline-block mt-4 text-white  px-4 py-1.5 font-semibold hover:cursor-pointer shadow-lg shadow-neutral-900/25 bg-blue-700 rounded hover:bg-blue-800" href="/shop">
              {t('banner_btn')}
            </Link>
          </div>
          <Image
            src={'/assets/banner.webp'}
            width={1000}
            height={667}
            alt="Tirze-Fit"
            priority
            className="-z-10 w-full h-[400px] md:h-[600px] object-cover object-top"
          />
        </div>
      </section>
      <ShopPage/>
    {
      locale == 'pl' ? (<section className="my-4 sm:my-10 lg:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 mt-10">
          <div>
            <Image
              src="/assets/img1.png"
              width={500}
              height={500}
              className="object-contain"
              alt="Welcome to our store with the highest quality chemical reagents."
            />
          </div>
          <div>
            <p className="mt-4 text-lg text-neutral-700">Specjalizujemy się w sprzedaży  odczynników takich jak tirzepatyd, semaglutyd czy  retatrutyd  Nasza oferta skierowana jest zarówno do laboratoriów badawczych, jak i osób prywatnych prowadzących własne projekty  i badania w zakresie biohackingu, optymalizacji metabolicznej czy badań nad otyłością.</p>
            <p className="mt-4 text-lg text-neutral-700">Każdy surowiec dostępny w naszej ofercie jest przebadany w niezależnych laboratoriach, a wyniki analiz HPLC oraz spektrometrii masowej, wyniki badań publikujemy na bieżąco na naszej  stronie internetowej.</p>
            <p className="mt-4 text-lg text-neutral-700">Oferujemy wyłącznie odczynniki spełniające najwyższe standardy czystości, co przekłada się na bezpieczeństwo i powtarzalność wyników w badaniach.</p>
          </div>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-semibold uppercase text-neutral-800 mb-6 mt-10" style={{ wordSpacing: '10px' }}>Oferta naszego sklepu obejmuje</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="p-4 border rounded transition-all duration-300 ease-in-out hover:scale-[102%] hover:shadow-md shadow-blue-300/50 border-neutral-400 hover:border-blue-700">
            <h3 className="text-2xl font-bold mb-2 text-neutral-800">Tirzepatyd</h3>
            <p className="text-neutral-700">Tirzepatyd to innowacyjny peptyd na odchudzanie, który pomaga kontrolować apetyt i poziom cukru we krwi. Działa poprzez naśladowanie dwóch hormonów inkretynowych – GLP-1 i GIP – które naturalnie regulują metabolizm.</p>
            <h4 className="text-xl text-neutral-800 font-medium mt-2">Efekty działania:- </h4>
            <ul className="check-list">
              <li>Spowalnia opróżnianie żołądka – dłużej czujesz sytość,</li>
              <li>Zmniejsza uczucie głodu – jesz mniej,</li>
              <li>Poprawia wrażliwość na insulinę – stabilizuje poziom cukru we krwi,</li>
              <li>Wspiera spalanie tłuszczu – metabolizm działa efektywniej.</li>
            </ul>
          </div>
          <div className="p-4 border rounded transition-all duration-300 ease-in-out hover:scale-[102%] hover:shadow-md shadow-blue-300/50 border-neutral-400 hover:border-blue-700">
            <h3 className="text-2xl font-bold mb-2 text-neutral-800">Semaglutyd 
            </h3>
            <p className="text-neutral-700">Semaglutyd to analog <strong>GLP-1</strong>, który naśladuje naturalny hormon sytości i wpływa na regulację metabolizmu.</p>
            <h4 className="text-xl text-neutral-800 font-medium mt-2">Jak działa?</h4>
            <ul className="check-list mb-2">
              <li>Wysyła sygnał do mózgu, że jesteś najedzony – ogranicza podjadanie,</li>
              <li>Spowalnia trawienie – uczucie sytości trwa dłużej,</li>
              <li>Obniża poziom cukru – poprawia wrażliwość na insulinę,</li>
              <li>Wspiera redukcję masy ciała poprzez zmniejszenie łaknienia.</li>
            </ul>
            <p className="text-neutral-700">Semaglutyd jest dobrze przebadany w kontekście leczenia cukrzycy typu 2 oraz kontroli masy ciała (badania STEP-1 do STEP-5).</p>
          </div>
          <div className="p-4 border rounded transition-all duration-300 ease-in-out hover:scale-[102%] hover:shadow-md shadow-blue-300/50 border-neutral-400 hover:border-blue-700">
            <h3 className="text-2xl font-bold mb-2 text-neutral-800">Retatrutyd </h3>
            <p className="text-neutral-700 mb-2">Retatrutyd to peptyd nowej generacji, działający jednocześnie na trzy receptory:</p>
            <ul className="check-list mb-2">
              <li><strong>GLP-1R</strong> -  tłumi apetyt, spowalnia opróżnianie żołądka, poprawia kontrolę glikemii,</li>
              <li><strong>GIPR</strong> - stymuluje wydzielanie insuliny, poprawia wrażliwość komórek,</li>
              <li><strong>GCGR (glukagonowy)</strong> - aktywuje spalanie tłuszczu, zwiększa wydatek energetyczny, wspiera termogenezę.</li>
            </ul>
            <p className="text-neutral-700"><strong>Retatrutyd</strong> to jeden z najnowszych kierunków w farmakologii metabolicznej, którego skuteczność przekracza nawet 24% redukcji masy ciała (NEJM, 2023).</p>
          </div>
        </div>

        <div className="my-22 text-center px-12 bg-lab">
          <div className="grid grid-cols-1 sm:grid-cols-12">
            <div className="sm:col-span-1"></div>
            <div className="sm:col-span-10 relative px-3">
              <p className="md:text-xl text-white mb-4">Chcesz wiedzieć więcej o działaniu tirzepatydu, czy semaglutydu i innych naszych produktów  ? na blogu naszego sklepu dzielimy się aktualnymi badaniami i praktyczną wiedzą. Zachęcamy do odkrycia naszej pełnej oferty, aby w pełni wykorzystać potencjał nowoczesnych <strong>peptydów na odchudzanie</strong>. Zastanawiales sie kiedyś gdzie kupic <strong>Semaglutyd</strong> ? kup juz dziś I ciesz sie szczuplą sylwetką</p>
              <Link href={'/blogs'} className="banner-btn inline-block mt-4 text-white  px-4 py-1.5 font-semibold hover:cursor-pointer shadow-lg shadow-neutral-900/25 bg-blue-700 rounded hover:bg-blue-800">{t('blog_btn')}</Link>
            </div>
          </div>
          <div className="sm:col-span-1"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-12 gap-4 sm:gap-6 lg:gap-10">
          <div className="col-span-8 order-2 sm:order-1">
            <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-neutral-800 mb-6 mt-10" style={{ wordSpacing: '5px' }}>Dlaczego warto zamawiać właśnie u nas?</h2>
            <p className="text-lg lg:pe-10">Kupując odczynniki chemiczne takie jak tirzepatyd, semaglutyd czy retatrutyd w naszym sklepie, zyskujesz:</p>
            <ul className="space-y-1 mt-2 list-disc">
              <li>100% potwierdzoną czystość (HPLC ≥99%),</li>
              <li>Dokumentowane pochodzenie partii i certyfikaty,</li>
              <li>Dyskretną wysyłkę na terenie całej UE </li>
              <li>Brak pośredników – tylko sprawdzone laboratoria badawcze,</li>
              <li>Wsparcie ze strony wykwalifikowanego lekarza </li>
            </ul>
          </div>
          <div className="col-span-4 order-1 sm:order-2">
            <Image
              src="/assets/why_order.png"
              width={500}
              height={500}
              className="w-full mx-auto"
              alt="Why Order From Us"
            />
          </div>
        </div>
        
        <ContactForm />

        <div className="">
          <h2 className="text-2xl  sm:text-3xl font-semibold uppercase text-neutral-800 mb-4 mt-10" style={{ wordSpacing: '5px' }}>Zastrzeżenie prawne</h2>
          <p className="">Produkty dostępne w naszej ofercie mają charakter wyłącznie badawczy (research-use only) Informacje zamieszczone na stronie nie stanowią porady medycznej ani zachęty do stosowania substancji niezatwierdzonych klinicznie. Niniejsze informacje nie stanowią oferty handlowej w rozumieniu prawa, a mają jedynie charakter informacyjny.e.</p>
          <p className="mt-2 ">Kupujący oświadcza, że nabywa preparaty wyłącznie do celów badawczych i zgodnie z obowiązującymi przepisami w jego kraju.</p>
        </div>

        <hr  className="my-10 border-neutral-400"/>

        <div className="lg:pe-16">
        <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-neutral-800 mb-5" style={{ wordSpacing: '10px' }}>Często zadawane pytania -</h2>
        <h3 className="text-xl sm:text-xl font-semibold text-neutral-800 mb-1">1. Czym jest Tirzepatyd i jak działa?</h3>
        <p className="mb-3 ps-5">Tirzepatyd to innowacyjny peptyd na odchudzanie, który naśladuje dwa hormony inkretynowe – GLP-1 i GIP. Pomaga kontrolować apetyt, spowalnia opróżnianie żołądka, stabilizuje poziom cukru we krwi i wspomaga spalanie tłuszczu.</p>
        <h3 className="text-xl sm:text-xl font-semibold text-neutral-800 mb-1">2. Jakie są korzyści stosowania Semaglutydu </h3>
        <p className="mb-3 ps-5">Semaglutyd to analog GLP-1, który redukuje uczucie głodu, spowalnia trawienie i poprawia wrażliwość na insulinę. Jest stosowany w leczeniu cukrzycy typu 2 oraz w kontroli masy ciała.</p>
        <h3 className="text-xl sm:text-xl font-semibold text-neutral-800 mb-1">3. Czy oferowane produkty są przebadane i bezpieczne? </h3>
        <p className="mb-3 ps-5">Tak, wszystkie nasze odczynniki chemiczne są testowane w niezależnych laboratoriach. Posiadają certyfikaty czystości (HPLC ≥99%) i dokumentowane pochodzenie partii.</p>
        <h3 className="text-xl sm:text-xl font-semibold text-neutral-800 mb-1">4. Jak wygląda proces zamówienia i dostawy? </h3>
        <p className="mb-3 ps-5">Oferujemy dyskretną wysyłkę na terenie całej UE, bez pośredników. Produkty są wysyłane bezpiecznie i zgodnie z obowiązującymi przepisami.</p>
        <h3 className="text-xl sm:text-xl font-semibold text-neutral-800 mb-1">5. Czy mogę skonsultować się w sprawie doboru produktu? </h3>
        <p className="mb-3 ps-5">Tak, zapewniamy wsparcie ekspertów. Możesz skontaktować się z nami przez stronę internetową lub infolinię, aby uzyskać szczegółowe informacje.</p>
        </div>

      </section>):(
        <section className="my-4 sm:my-10 lg:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 mt-10">
          <div>
            <Image
              src="/assets/img1.png"
              width={500}
              height={500}
              className="object-contain"
              alt="Welcome to our store with the highest quality chemical reagents."
            />
          </div>
          <div>
            <p className="mt-4 text-lg text-neutral-700">We specialize in the sale of reagents such as tirzepatide, semaglutide or retatrutide. Our offer is addressed to both research laboratories and private individuals conducting their own projects and research in the field of biohacking, metabolic optimization or obesity research.</p>
            <p className="mt-4 text-lg text-neutral-700">Each raw material available in our offer is tested in independent laboratories, and the results of HPLC and mass spectrometry analyses, the results of the research are published on an ongoing basis on our website.</p>
            <p className="mt-4 text-lg text-neutral-700">We offer only reagents that meet the highest standards of purity, which translates into safety and repeatability of results in research.</p>
          </div>
        </div>

        <h2 className="text-center text-2xl sm:text-3xl font-semibold uppercase text-neutral-800 mb-6 mt-10" style={{ wordSpacing: '10px' }}>The offer of our store includes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="p-4 border rounded transition-all duration-300 ease-in-out hover:scale-[102%] hover:shadow-md shadow-blue-300/50 border-neutral-400 hover:border-blue-700">
            <h3 className="text-2xl font-bold mb-2 text-neutral-800">Tirzepatide</h3>
            <p className="text-neutral-700">Tirzepatide is an innovative weight loss peptide that helps control appetite and blood sugar levels. It works by mimicking two incretin hormones – GLP-1 and GIP – that naturally regulate metabolism.</p>
            <h4 className="text-xl text-neutral-800 font-medium mt-2">Effects:- </h4>
            <ul className="check-list">
              <li>Slows stomach emptying – you feel full longer,</li>
              <li>Reduces hunger – you eat less,</li>
              <li>Improves insulin sensitivity – stabilizes blood sugar levels,</li>
              <li>Supports fat burning – metabolism works more efficiently.</li>
            </ul>
          </div>
          <div className="p-4 border rounded transition-all duration-300 ease-in-out hover:scale-[102%] hover:shadow-md shadow-blue-300/50 border-neutral-400 hover:border-blue-700">
            <h3 className="text-2xl font-bold mb-2 text-neutral-800">Semaglutide 
            </h3>
            <p className="text-neutral-700">Semaglutide is a <strong>GLP-1</strong> analogue that mimics the natural satiety hormone and affects the regulation of metabolism.</p>
            <h4 className="text-xl text-neutral-800 font-medium mt-2">How does it work?</h4>
            <ul className="check-list mb-2">
              <li>It sends a signal to the brain that you are full - limits snacking,</li>
              <li>Slows digestion - the feeling of satiety lasts longer,</li>
              <li>Lowers sugar levels - improves insulin sensitivity,</li>
              <li>Supports weight loss by reducing appetite.</li>
            </ul>
            <p className="text-neutral-700">Semaglutide is well-studied in the context of treating type 2 diabetes and weight control (STEP-1 to STEP-5 studies).</p>
          </div>
          <div className="p-4 border rounded transition-all duration-300 ease-in-out hover:scale-[102%] hover:shadow-md shadow-blue-300/50 border-neutral-400 hover:border-blue-700">
            <h3 className="text-2xl font-bold mb-2 text-neutral-800">Retatrutide</h3>
            <p className="text-neutral-700 mb-2">Retatrutide is a new generation peptide that works simultaneously on three receptors:</p>
            <ul className="check-list mb-2">
              <li><strong>GLP-1R</strong> -  suppresses appetite, slows gastric emptying, improves glycemic control,</li>
              <li><strong>GIPR</strong> - stimulates insulin secretion, improves cell sensitivity,</li>
              <li><strong>GCGR (Glucagon)</strong> - activates fat burning, increases energy expenditure, supports thermogenesis.</li>
            </ul>
            <p className="text-neutral-700"><strong>Retatrutide</strong> is one of the latest directions in metabolic pharmacology, the effectiveness of which exceeds even 24% of body weight reduction (NEJM, 2023).</p>
          </div>
        </div>

        <div className="my-22 text-center px-12 bg-lab">
          <div className="grid grid-cols-1 sm:grid-cols-12">
            <div className="sm:col-span-1"></div>
            <div className="sm:col-span-10 relative px-3">
              <p className="md:text-xl text-white mb-4">Want to know more about the effects of tirzepatide, or semaglutide and our other products? On our store's blog, we share current research and practical knowledge. We encourage you to discover our full offer to fully use the potential of modern <strong>peptides for weight loss</strong> . Have you ever wondered where to buy <strong>Semaglutide</strong> ? Buy today and enjoy a slim figure</p>
              <Link href={'/blogs'} className="banner-btn inline-block mt-4 text-white  px-4 py-1.5 font-semibold hover:cursor-pointer shadow-lg shadow-neutral-900/25 bg-blue-700 rounded hover:bg-blue-800">{t('blog_btn')}</Link>
            </div>
          </div>
          <div className="sm:col-span-1"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-12 gap-4 sm:gap-6 lg:gap-10">
          <div className="col-span-8 order-2 sm:order-1">
            <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-neutral-800 mb-6 mt-10" style={{ wordSpacing: '5px' }}>Why is it worth ordering from us?</h2>
            <p className="text-lg lg:pe-10">When you buy chemical reagents such as tirzepatide, semaglutide or retatrutide in our store, you gain:</p>
            <ul className="space-y-1 mt-2 list-disc">
              <li>100% confirmed purity (HPLC ≥99%),</li>
              <li>Documented batch origin and certificates,</li>
              <li>Discreet shipping throughout the EU,</li>
              <li>No intermediaries - only proven research laboratories,</li>
              <li>Support from a qualified doctor</li>
            </ul>
          </div>
          <div className="col-span-4 order-1 sm:order-2">
            <Image
              src="/assets/why_order.png"
              width={500}
              height={500}
              className="w-full mx-auto"
              alt="Why Order From Us"
            />
          </div>
        </div>
        
        <ContactForm />

        <div className="">
          <h2 className="text-2xl  sm:text-3xl font-semibold uppercase text-neutral-800 mb-4 mt-10" style={{ wordSpacing: '5px' }}>Legal disclaimer</h2>
          <p className="">The products available in our offer are for research-use only. The information provided on the website does not constitute medical advice or encouragement to use clinically unapproved substances. This information does not constitute a commercial offer within the meaning of the law, but is for informational purposes only.</p>
          <p className="mt-2 ">The Buyer declares that he/she is purchasing the preparations only for research purposes and in accordance with the applicable regulations in his/her country.</p>
        </div>

        <hr  className="my-10 border-neutral-400"/>

        <div className="lg:pe-16">
        <h2 className="text-2xl sm:text-3xl font-semibold uppercase text-neutral-800 mb-5" style={{ wordSpacing: '10px' }}>Frequently Asked Questions -</h2>
        <h3 className="text-xl sm:text-xl font-semibold text-neutral-800 mb-1">1. What is Tirzepatid and how does it work?</h3>
        <p className="mb-3 ps-5">Tirzepatide is an innovative weight loss peptide that mimics two incretin hormones – GLP-1 and GIP. It helps control appetite, slows stomach emptying, stabilizes blood sugar levels and supports fat burning.</p>
        <h3 className="text-xl sm:text-xl font-semibold text-neutral-800 mb-1">2. What are the benefits of using Semaglutide?</h3>
        <p className="mb-3 ps-5">Semaglutide is a GLP-1 analogue that reduces hunger, slows digestion, and improves insulin sensitivity. It is used to treat type 2 diabetes and control body weight.</p>
        <h3 className="text-xl sm:text-xl font-semibold text-neutral-800 mb-1">3. Are the products offered tested and safe?</h3>
        <p className="mb-3 ps-5">Yes, all our chemical reagents are tested in independent laboratories. They have purity certificates (HPLC ≥99%) and documented batch origin.</p>
        <h3 className="text-xl sm:text-xl font-semibold text-neutral-800 mb-1">4. What does the ordering and delivery process look like?</h3>
        <p className="mb-3 ps-5">We offer discreet shipping throughout the EU, without intermediaries. Products are shipped safely and in accordance with applicable regulations.</p>
        <h3 className="text-xl sm:text-xl font-semibold text-neutral-800 mb-1">5. Can I consult on product selection?</h3>
        <p className="mb-3 ps-5">Yes, we provide expert support. You can contact us via website or hotline for more details.</p>
        </div>

      </section>
      )
    }

    </main>
  );
}
