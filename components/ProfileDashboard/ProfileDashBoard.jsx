'use client'
import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Copy, Share } from "lucide-react";
import { signOut } from "next-auth/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Link } from "@/i18n/navigation";

export default function ProfileDashboard({ user, referralDetails, orders }) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        username: user?.username || "",
    });
    console.log("Orders", orders)
    const invitationLink = `${process.env.NEXT_PUBLIC_BASE_URL}en/auth?tab=signup&invitationCode=${user.invitationCode}`;
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Check this out!",
                    text: "Visit this link:",
                    url: window.location.href,
                });
                console.log("Shared successfully");
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            alert("Sharing is not supported in your browser.");
        }
    };

    const handleCopy = async (text) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your update logic here
        setIsEditing(false);
    };

    const handleLogout = () => {
        signOut({ callbackUrl: `${window.location.origin}/auth` });
    }

    return (
        <div className="max-w-6xl mx-auto py-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Profile Dashboard</h1>
                    <p className="text-gray-600">Manage your account information and settings</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Button onClick={handleLogout} variant="destructive" size={'sm'} className="gap-2">
                        Logout
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        {["overview", "referrals", "orders"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-sm font-medium ${activeTab === tab
                                    ? "border-b-2 border-blue-500 text-blue-600"
                                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                                    {isEditing ? (
                                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                            <div>
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="username">Username</Label>
                                                <Input
                                                    id="username"
                                                    name="username"
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button type="submit" size={'sm'} className="mt-4 bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                                                <Button variant="outline" onClick={handleEditToggle} size={'sm'} className="mt-4 ">
                                                    Cancel
                                                </Button>
                                            </div>
                                        </form>
                                    ) : (
                                        <div className="mt-4 space-y-2">
                                            <p className="text-gray-700">
                                                <span className="font-medium">Name:</span> {user.name}
                                            </p>
                                            <p className="text-gray-700">
                                                <span className="font-medium">Email:</span> {user.email}
                                            </p>
                                            <p className="text-gray-700">
                                                <span className="font-medium">Username:</span> {user.username}
                                            </p>
                                            {/* <Button onClick={handleEditToggle} size={'sm'} className="mt-4 bg-blue-600 hover:bg-blue-700">
                                                Edit Profile
                                            </Button> */}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900">Account Stats</h2>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div className="bg-green-50 border border-green-300 p-4 rounded-lg">
                                            <p className="text-sm text-neutral-500">Credits <span className="text-sm">(1 credt = 1% discout)</span></p>
                                            <p className="text-2xl text-green-700 font-bold">{user.credits}</p>
                                        </div>
                                        <div className=" p-4 bg-blue-50 border border-blue-300 rounded-lg">
                                            <p className="text-sm text-gray-500">Referrals</p>
                                            <p className="text-2xl text-blue-600 font-bold">{user.referralCount}</p>
                                        </div>
                                    </div>
                                </div>

                                {user.invitationCode && (
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900">Invitation Code</h2>
                                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                            <p className="font-mono text-blue-800">{user.invitationCode} <Button onClick={() => handleCopy(user.invitationCode)} variant="outline" className="gap-2">
                                                <Copy className="w-4 h-4" />
                                                {copied ? "Copied!" : "Copy"}
                                            </Button></p>
                                            <p className="mt-2 text-sm text-gray-600">
                                                Share this code with friends to earn referral credits
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "referrals" && (
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">Referral Program</h2>
                            <div className="mt-6 space-y-6">
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h3 className="font-medium text-blue-700">Your Invitation Link</h3>
                                    <div className="mt-2 flex flex-wrap md:flex-nowrap space-x-2 space-y-2">
                                        <input
                                            type="text"
                                            readOnly
                                            value={invitationLink}
                                            className="flex-1 p-2 py-1 font-sans border border-blue-300 bg-white/75 text-black focus:outline-0 rounded"
                                        />
                                        <Button onClick={() => handleCopy(invitationLink)} size={'sm'} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                            <Copy />
                                            {copied ? "Copied!" : "Copy"}
                                        </Button>
                                        <Button onClick={handleShare} size={'sm'} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                            <Share />
                                            Share
                                        </Button>
                                    </div>
                                    <div className="ps-1 mt-3">
                                        <p className="text-sm mb-0.5 text-gray-600">
                                            Share your invitation link to earn more credits and rewards!
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Note:</span> You will earn 1 credit for each friend who signs up using your link.
                                        </p>
                                    </div>
                                </div>
                                <hr className="border-gray-300" />
                                <div className="overflow-x-auto">
                                    <Table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                        <TableHeader>
                                            <TableRow className="text-left bg-gray-100">
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Name</TableHead>
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Email</TableHead>
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Orders</TableHead>
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Items</TableHead>
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Credits Earned</TableHead>
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Joined</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {referralDetails.map((referral, index) => (
                                                <TableRow key={index} className="border-t border-gray-200">
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">{referral.name}</TableCell>
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">{referral.email}</TableCell>
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">{referral.orderCount}</TableCell>
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">{referral.itemCount}</TableCell>
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">{referral.creditsEarned}</TableCell>
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">
                                                        {referral.createdAt ? new Date(referral.createdAt).toLocaleDateString() : "N/A"}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                            </div>
                        </div>
                    )}

                    {activeTab === "orders" && (
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">Your Orders</h2>
                            {orders.length <=0 && <p className="mt-4 text-gray-600">No orders found.</p>}
                            {orders.length > 0 && (
                                <div className="overflow-x-auto mt-4">
                                    <Table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                        <TableHeader>
                                            <TableRow className="text-left bg-gray-100">
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Sr no.</TableHead>
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Items</TableHead>
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Total Amount</TableHead>
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Status</TableHead>
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Date</TableHead>
                                                <TableHead className="px-4 py-2 text-sm font-medium text-gray-700">Details</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders.map((order, index) => (
                                                <TableRow key={index} className="border-t border-gray-200">
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">{++index}</TableCell>
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">{order.items.map(
                                                        item =>(
                                                            <p key={item.productName}>{item.productName}</p>
                                                        )
                                                    )}</TableCell>
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">{order.total}</TableCell>
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">{order.status}</TableCell>
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell className="px-4 py-2 text-sm text-gray-800"><Link className="text-blue-600 underline" href={`/order-details?orderId=${order._id}`}>View</Link></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}