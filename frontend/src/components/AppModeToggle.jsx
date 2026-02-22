import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const AppModeToggle = () => {
    const [appMode, setAppMode] = useState('production');
    const { backendUrl, user } = useContext(ShopContext);

    useEffect(() => {
        const fetchMode = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/config/mode`);
                const data = await response.json();
                if (data.success) {
                    setAppMode(data.mode);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchMode();
    }, [backendUrl]);

    // Only show toggle tools if admin
    const isAdmin = user?.role === 'admin';

    if (!isAdmin && appMode === 'production') return null;

    return (
        <div className={`w-full text-center py-1 text-sm font-medium relative z-50 ${appMode === 'staging' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
            {appMode === 'staging' ? '⚠️ STAGING ENVIRONMENT ACTIVE ⚠️' : ''}

            {isAdmin && (
                <button
                    onClick={() => setAppMode(prev => prev === 'staging' ? 'production' : 'staging')}
                    className="ml-4 underline text-xs cursor-pointer"
                >
                    Toggle to {appMode === 'staging' ? 'Production' : 'Staging'}
                </button>
            )}
        </div>
    );
};

export default AppModeToggle;
