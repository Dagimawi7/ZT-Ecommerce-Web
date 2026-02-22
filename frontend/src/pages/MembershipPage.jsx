import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const MembershipPage = () => {
    const { user, isMember, backendUrl, token, fetchUserProfile } = useContext(ShopContext);
    const [loading, setLoading] = useState(false);

    const upgradeMembership = async () => {
        if (!token) {
            toast.error('Please login first to become a member');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/user/upgrade-membership`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({ userId: user._id })
            });
            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                // Refresh user profile to get new role
                await fetchUserProfile(token);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='pt-14 border-t text-center'>
            <div className='text-2xl mb-10'>
                <Title text1={'ZT'} text2={'MEMBERSHIP'} />
            </div>

            <div className='max-w-4xl mx-auto'>
                <div className='bg-gray-50 border rounded-lg p-8 sm:p-12 mb-10 shadow-sm'>
                    <h2 className='text-3xl font-medium mb-6'>Join ZT Plus</h2>
                    <p className='text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
                        Elevate your shopping experience. ZT Plus members get exclusive perks, early access to new drops, and special pricing you won't find anywhere else.
                    </p>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12'>
                        <div className='bg-white p-6 rounded border shadow-sm'>
                            <div className='text-2xl mb-4'>🚚</div>
                            <h3 className='font-medium text-lg mb-2'>Free Shipping</h3>
                            <p className='text-gray-500 text-sm'>Members get free standard shipping on every order, no minimum purchase required.</p>
                        </div>

                        <div className='bg-white p-6 rounded border shadow-sm'>
                            <div className='text-2xl mb-4'>💰</div>
                            <h3 className='font-medium text-lg mb-2'>Exclusive Pricing</h3>
                            <p className='text-gray-500 text-sm'>Unlock special member-only prices on select products and exclusive promo codes.</p>
                        </div>

                        <div className='bg-white p-6 rounded border shadow-sm'>
                            <div className='text-2xl mb-4'>⭐</div>
                            <h3 className='font-medium text-lg mb-2'>Early Access</h3>
                            <p className='text-gray-500 text-sm'>Shop new collections and limited drops before the general public.</p>
                        </div>
                    </div>

                    {isMember ? (
                        <div className='bg-green-50 border border-green-200 text-green-800 p-6 rounded'>
                            <div className='flex items-center justify-center gap-2 mb-2'>
                                <span className='px-2 py-1 bg-green-600 text-white text-xs font-bold rounded'>ACTIVE</span>
                                <span className='font-medium text-lg'>You are a ZT Plus Member</span>
                            </div>
                            <p className='text-sm mt-2'>Your benefits are automatically applied at checkout.</p>
                        </div>
                    ) : (
                        <button
                            onClick={upgradeMembership}
                            disabled={loading}
                            className={`bg-black text-white px-12 py-4 text-sm font-medium hover:bg-gray-800 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'PROCESSING...' : 'BECOME A MEMBER - FREE'}
                        </button>
                    )}

                    {!token && !isMember && (
                        <p className='mt-4 text-sm text-gray-500'>You need to be logged in to upgrade.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;
