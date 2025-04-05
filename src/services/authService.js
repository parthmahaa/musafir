import api from './api';

export const forgotPasswordService = {
    sendOTP: async (email) => {
        const { data } = await api.post('/auth/forgot-password', { email });
        return data;
    },

    verifyOTPAndUpdatePassword: async (email, otp, newPassword) => {
        const { data } = await api.post('/auth/reset-password', {
            email,
            otp,
            newPassword
        });
        return data;
    }
};
