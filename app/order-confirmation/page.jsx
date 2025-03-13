'use client';
import { LoadingOverlay } from '@/components/Common/Loading';
import { getOrderById } from '@/lib/actions/order.action.js';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [orderDetails, setOrderDetails] = useState(null); // Initialize to null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (orderId) {
            async function getOrder() {
                try {
                    const result = await getOrderById(orderId);
                    if (result && result.error) {
                        setError(result.error);
                    } else if (result && result.message === 'ok') {
                        setOrderDetails(result.order); // Use result.order
                    } else {
                        setError("Unexpected error occured")
                    }
                } catch (error) {
                    setError('An error has occurred. Please try again.');
                    console.error('Error during fetching order details:', error);
                } finally {
                    setLoading(false);
                }
            }
            getOrder();
        } else {
            setError("Order id is missing");
            setLoading(false);
        }
    }, [orderId]); // Add orderId as a dependency

    if (loading) {
        return <main><LoadingOverlay /></main>; // Or your loading component
    }

    if (error) {
        return <main>Error: {error}</main>;
    }

    if (!orderDetails) {
        return <main>Order not found</main>
    }

    return (
        <main>
            {/* Render order details here */}
            {orderDetails && (
                <div className="rounded-lg shadow-md overflow-hidden bg-white p-6 md:p-8 lg:p-10 border border-gray-400/50">
                    <p className="text-center bg-blue-800 text-white py-1.5 px-2 mb-4">Nasz opiekun klienta wyśle Ci konto bankowe, na które otrzymasz płatność w ciągu 2 godzin od złożenia zamówienia. Twoje zamówienie zostanie potwierdzone dopiero po pomyślnym dokonaniu płatności.</p>
                    <div className="border-b border-gray-200 pb-6 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">Szczegółowe informacje</h2>
                        <p className="text-sm text-gray-500 mt-1">Order ID: {orderDetails._id} | Umieszczono w dniu: {new Date(orderDetails.createdAt).toLocaleString()}</p>
                    </div>

                    <div className="md:flex md:space-x-12 mb-8">
                        <div className="md:w-1/2">
                            <h3 className="text-lg font-medium text-gray-800 mb-3">Adres dochodu</h3>
                            <ul className="text-gray-600 space-y-1">
                                <li><strong>Nazwa:</strong> {orderDetails.addressDetails.name}</li>
                                <li><strong>E-Mail:</strong> {orderDetails.addressDetails.email}</li>
                                <li><strong>Telefon:</strong> {orderDetails.addressDetails.phoneNumber}</li>
                                {
                                    orderDetails.deliveryOption === 'inpost' ? (
                                        <li><strong>Numer paczkomatu: </strong>{orderDetails.addressDetails.parcelMachineNumber}</li>
                                    ) :
                                        (
                                            <li><strong>Adresse:</strong> {orderDetails.addressDetails.address}, {orderDetails.addressDetails.country}</li>
                                        )
                                }

                            </ul>
                        </div>
                        <div className="md:w-1/2 mt-4 md:mt-0">
                            <h3 className="text-lg font-medium text-gray-800 mb-3">Porządek</h3>
                            <div className="text-gray-600 space-y-1">
                                <p>Porządek: {orderDetails.status}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Zamów projekt</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-700">
                                        <th className="px-4 py-3 border border-gray-300 text-left font-medium">Produkt</th>
                                        <th className="px-4 py-3 border border-gray-300 text-left font-medium">Ilość</th>
                                        <th className="px-4 py-3 border border-gray-300 text-right font-medium">Cena</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetails.items.map((product, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td className="px-4 py-3 text-gray-700 border border-gray-300">
                                                <Link href={`/product/${product.slug}`} className="hover:underline text-blue-500">
                                                    {product.productName}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-3 text-gray-700 border border-gray-300">{product.quantity}</td>
                                            <td className="px-4 py-3 text-gray-700 border border-gray-300 text-right">€{product.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6 mt-8">
                        <div className="md:flex md:justify-end">
                            <div className="md:w-1/2 md:text-right">
                                <div className="text-gray-600 space-y-1">
                                    <p className="mb-1">Suma częściowa: €{orderDetails?.total.toFixed(2)}</p>
                                    {/* <p className="mb-1">Discount: €{orderDetails.discount.toFixed(2)}</p> */}
                                    <p>Opłata za dostawę: €{orderDetails?.deliverCharge?.toFixed(2)}</p>
                                </div>
                                <p className="text-xl font-semibold text-gray-800 mb-2">Łączny: €{parseFloat(orderDetails?.total.toFixed(2)) + parseFloat(orderDetails?.deliverCharge?.toFixed(2)) }</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Page;