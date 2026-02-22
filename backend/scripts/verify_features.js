
// This script simulates frontend calls to verify backend features
// Usage: node backend/scripts/verify_features.js (Ensure server is running)

import axios from 'axios';

const API_URL = 'http://localhost:4000/api';
let userToken = '';
let adminToken = '';
let userId = '';
let productId = '';
let orderId = '';

const logResult = (testName, success, message) => {
    console.log(`${success ? '✅' : '❌'} [${testName}] ${message}`);
};

const runTests = async () => {
    console.log('🚀 Starting Verification Tests...\n');

    // 1. Register User
    try {
        const rand = Math.floor(Math.random() * 10000);
        const res = await axios.post(`${API_URL}/user/register`, {
            name: `TestUser${rand}`,
            email: `testuser${rand}@example.com`,
            password: 'password123'
        });
        if (res.data.success) {
            userToken = res.data.token;
            logResult('Register User', true, 'User registered successfully');
        } else {
            logResult('Register User', false, res.data.message);
        }
    } catch (e) { logResult('Register User', false, e.message); }

    // 2. Login as User to get ID (Normally decode token, but let's use a profile endpoint if valid)
    // Actually our register returns token. We need to verify auth middleware.
    // Let's try to place an order to check user auth.

    // 3. User Validation (Protected Route)
    if (userToken) {
        try {
            // Mock Order
            const res = await axios.post(`${API_URL}/order/place`, {
                userId: 'temp-id-will-be-overwritten-by-middleware',
                items: [],
                amount: 100,
                address: {}
            }, { headers: { token: userToken } });

            // Note: Middleare overrides userId in body with token id
            if (res.data.success) {
                logResult('User Auth & Place Order', true, 'Order placed successfully');
            } else {
                logResult('User Auth & Place Order', false, res.data.message);
            }
        } catch (e) { logResult('User Auth & Place Order', false, e.message); }
    }

    // 4. Admin Auth (Failure Scenario)
    if (userToken) {
        try {
            await axios.post(`${API_URL}/product/add`, {}, { headers: { token: userToken } });
            logResult('RBAC - User Access Admin Route', false, 'Should have failed but succeeded');
        } catch (e) {
            // We expect a 403 or success: false
            if (e.response && e.response.data && !e.response.data.success) {
                logResult('RBAC - User Access Admin Route', true, 'Correctly blocked user from admin route');
            } else {
                // It might return success: false with 200 OK because of our middleware structure
                // If axios didn't throw, check response
            }
        }
        // Actually our middleware returns json success:false, not 403 status code in some cases, 
        // let's check exact response if axios doesn't throw
        try {
            const res = await axios.post(`${API_URL}/product/add`, {}, { headers: { token: userToken } });
            if (!res.data.success && res.data.message === 'Not authorized as admin') {
                logResult('RBAC - User Access Admin Route', true, 'Correctly blocked user from admin route');
            } else {
                logResult('RBAC - User Access Admin Route', false, `Response: ${JSON.stringify(res.data)}`);
            }
        } catch (e) { }
    }

    // 5. Admin Login (We need an admin user)
    // Since we can't easily create one via API without a seed, we will manualy update the user we just created
    // But we can't access DB here directly easily without mongoose connection.
    // For this test script to fully work, assume we have an admin.
    // Let's skip explicit admin testing or assume a known admin credential?
    // User requested "Manual MongoDB edit for the first admin".
    // I will log instructions to manually verify admin.

    console.log('\n⚠️  Manual Step Required for Full Verification:');
    console.log('1. Go to MongoDB Compass/Atlas.');
    console.log('2. Find the user created above.');
    console.log('3. Set role: "admin".');
    console.log('4. Use the login endpoint with that email to get admin token.');
    console.log('5. Test /api/product/add endpoint with admin token.');

    // 6. Product Recommendations
    // List products
    try {
        const res = await axios.get(`${API_URL}/product/list`);
        if (res.data.success && res.data.products.length > 0) {
            const product = res.data.products[0];
            logResult('List Products', true, `Found ${res.data.products.length} products`);

            // Test Related
            const relRes = await axios.post(`${API_URL}/product/related`, {
                productId: product._id,
                category: product.Category,
                subCategory: product.subCategory
            });
            if (relRes.data.success) {
                logResult('Product Recommendations', true, `Found ${relRes.data.products.length} related products`);
            } else {
                logResult('Product Recommendations', false, relRes.data.message);
            }
        } else {
            console.log('Product Check: No products found, skipping recommendations test.');
        }
    } catch (e) { logResult('Product Check', false, e.message); }

    console.log('\n🏁 Verification Script Complete.');
};

runTests();
