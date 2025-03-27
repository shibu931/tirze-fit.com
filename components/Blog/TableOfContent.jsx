import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { JSDOM } from 'jsdom'
import { useTranslations } from "next-intl";

const TableOfContent = ({ content }) => {
    const t = useTranslations('Common')
    const generateTOC = (htmlContent) => {
        if (!htmlContent) return [];

        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;
        const headings = document.querySelectorAll('h2, h3');

        const toc = [];
        
        headings.forEach((heading) => {
            const id = heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-');
            heading.id = id;

            const level = heading.tagName.substring(1);
            const newItem = { id, text: heading.textContent };

            if (level === '2') {
                toc.push(newItem);
            } else if (level === '3' && toc.length > 0) {
                if (!toc[toc.length - 1].children) {
                    toc[toc.length - 1].children = [];
                }
                toc[toc.length - 1].children.push(newItem);
            }
        });

        return toc;
    };

    const tocData = generateTOC(content);

    return (
        <div className="table-of-contents lg:sticky top-20 bg-neutral-200/25 p-6 py-2 rounded border border-neutral-300/80 shadow shadow-neutral-400/50">
            <Accordion type="single" defaultValue="item-1" collapsible className="w-full hover:cursor-pointer"> 
                <AccordionItem value="item-1" className="">
                    <AccordionTrigger className="hover:no-underline py-2">
                        <p className="text-xl font-bold uppercase text-neutral-700">{t('toc')}</p>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-decimal ms-2 me-2">
                            {tocData.map((item) => (
                                <li key={item.id} className="text-base mb-3 text-neutral-800 font-semibold">
                                    <a href={`#${item.id}`} className="hover:underline">
                                        {item.text}
                                    </a>
                                    {item.children && item.children.length > 0 && (
                                        <ul className="list-disc">
                                            {item.children.map((child) => (
                                                <li key={child.id} className="text-sm font-semibold text-gray-700">
                                                    <a href={`#${child.id}`} className="hover:underline">
                                                        {child.text}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default TableOfContent;