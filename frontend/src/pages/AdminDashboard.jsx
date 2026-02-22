import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const { backendUrl, token, user, navigate } = useContext(ShopContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            navigate('/');
            toast.error('Unauthorized access');
            return;
        }

        const fetchStats = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/analytics/dashboard`, {
                    headers: { token }
                });
                const data = await response.json();
                if (data.success) {
                    setStats(data.stats);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchStats();
        }
    }, [token, user, navigate, backendUrl]);

    if (loading) return <div className="text-center py-20">Loading dashboard...</div>;
    if (!stats) return <div className="text-center py-20 text-red-500">Failed to load stats.</div>;

    return (
        <div className='pt-14 border-t'>
            <div className='text-2xl mb-8'>
                <Title text1={'ADMIN'} text2={'DASHBOARD'} />
            </div>

            {/* Primary KPI Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
                <div className='bg-white p-6 border shadow-sm rounded-lg'>
                    <p className='text-sm text-gray-500 font-medium'>Total Revenue</p>
                    <p className='text-3xl font-bold mt-2'>${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className='bg-white p-6 border shadow-sm rounded-lg'>
                    <p className='text-sm text-gray-500 font-medium'>Total Orders</p>
                    <p className='text-3xl font-bold mt-2'>{stats.totalOrders}</p>
                </div>
                <div className='bg-white p-6 border shadow-sm rounded-lg'>
                    <p className='text-sm text-gray-500 font-medium'>Member Count</p>
                    <p className='text-3xl font-bold mt-2'>{stats.memberCount}</p>
                </div>
                <div className='bg-white p-6 border shadow-sm rounded-lg'>
                    <p className='text-sm text-gray-500 font-medium'>Avg. Order Value</p>
                    <p className='text-3xl font-bold mt-2'>${stats.averageOrderValue.toFixed(2)}</p>
                </div>
            </div>

            {/* Secondary KPI Cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
                <div className='bg-blue-50 p-6 border border-blue-100 rounded-lg'>
                    <p className='text-sm text-blue-800 font-medium'>Conversion Rate (Simulated)</p>
                    <p className='text-3xl text-blue-600 font-bold mt-2'>{stats.simulatedConversionRate}</p>
                </div>
                <div className='bg-orange-50 p-6 border border-orange-100 rounded-lg'>
                    <p className='text-sm text-orange-800 font-medium'>Cart Abandonment (Simulated)</p>
                    <p className='text-3xl text-orange-600 font-bold mt-2'>{stats.simulatedCartAbandonment}</p>
                </div>
                <div className='bg-purple-50 p-6 border border-purple-100 rounded-lg'>
                    <p className='text-sm text-purple-800 font-medium'>Active Promo Usage</p>
                    <p className='text-3xl text-purple-600 font-bold mt-2'>{stats.promoUsageCount} used</p>
                </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Simple CSS Bar Chart for Revenue */}
                <div className='bg-white p-6 border shadow-sm rounded-lg'>
                    <h3 className='font-medium text-lg mb-6'>Revenue History</h3>
                    <div className='flex items-end justify-between h-48 gap-2'>
                        {stats.revenueChart.map((point, index) => {
                            // Find max to scale relatively
                            const max = Math.max(...stats.revenueChart.map(p => p.amount), 1);
                            const heightPercentage = (point.amount / max) * 100;

                            return (
                                <div key={index} className='flex flex-col items-center flex-1 group'>
                                    <div className='relative w-full flex justify-center'>
                                        <div
                                            className='w-full bg-black hover:bg-gray-700 transition-all rounded-t-sm'
                                            style={{ height: `${heightPercentage}%`, minHeight: '4px' }}
                                        ></div>
                                        <div className='opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none transition-opacity'>
                                            ${point.amount.toFixed(0)}
                                        </div>
                                    </div>
                                    <p className='text-[10px] text-gray-500 mt-2 truncate max-w-full'>{point.date}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Top Products Table */}
                <div className='bg-white p-6 border shadow-sm rounded-lg'>
                    <h3 className='font-medium text-lg mb-6'>Top Selling Products</h3>
                    <div className='overflow-x-auto'>
                        <table className='w-full text-sm text-left'>
                            <thead className='text-xs text-gray-500 uppercase bg-gray-50'>
                                <tr>
                                    <th className='px-4 py-3 rounded-tl'>Product Name</th>
                                    <th className='px-4 py-3'>Price</th>
                                    <th className='px-4 py-3 rounded-tr'>Sales</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.topSellingProducts.map((product, index) => (
                                    <tr key={index} className='border-b last:border-0 hover:bg-gray-50'>
                                        <td className='px-4 py-3 font-medium text-gray-900 truncate max-w-[200px]'>
                                            {product.name}
                                        </td>
                                        <td className='px-4 py-3'>${product.price}</td>
                                        <td className='px-4 py-3'>
                                            <span className='bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded'>
                                                {product.sales} units
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
