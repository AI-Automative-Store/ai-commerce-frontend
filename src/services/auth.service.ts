/**
 * Authentication Service
 * API calls for user authentication
 */

import { apiClient } from './api';
import type { User, LoginCredentials, RegisterData } from '@/types/user.types';

export const authService = {
    /**
     * Login user
     */
    async login(credentials: LoginCredentials) {
        return apiClient.post<{ user: User; token: string }>('/auth/login', credentials);
    },

    /**
     * Register new user
     */
    async register(data: RegisterData) {
        return apiClient.post<{ user: User; token: string }>('/auth/register', data);
    },

    /**
     * Logout user
     */
    async logout() {
        return apiClient.post('/auth/logout');
    },

    /**
     * Get current user profile
     */
    async getCurrentUser() {
        return apiClient.get<User>('/auth/me');
    },
};
