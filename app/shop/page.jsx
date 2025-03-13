import ShopPage from '@/components/ShopPage/ShopPage'
import React from 'react'

const page = () => {
  return (
    <main className='max-w-10xl mx-auto'>
        <p className="text-center text-gray-600 text-sm tracking-widest">Wszystkie niżej wymienione właściwości zostały zaobserwowane przy badaniach laboratoryjnych. Mają one charakter wyłącznie informacyjny. Wszelkie informacje zawarte w opisach nie są zatwierdzone przez GIS, GIF ani EFSA. Substancja nie jest produktem spożywczym ani suplementem diety. Nie nadaje się do spożycia przez ludzi. Produkt jest kwalifikowany jako odczynnik chemiczny / materiał odniesienia dopuszczony do obrotu na terenie UE. Można go używać wyłącznie do badań naukowych. Pozostałe informacje na temat środka zawarte są w karcie charakterystyki substancji chemicznej, którą udostępniamy do wglądu. Produkty dostępne są  dla instytucji lub osób prywatnych, które są powiązane z działalnością badawczą lub laboratoryjną.</p>
        <hr className='my-4 lg:my-6 border-gray-400'/>
        <ShopPage/>
    </main>
  )
}

export default page