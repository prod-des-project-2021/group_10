import React from 'react';
import { useAuth } from "../../contexts/AuthContext"

// test('this is true', () => {
//     expect(true).toBeTruthy();
// })

jest.mock('../../firebase', () => {
    const useContext = jest.fn();
})

describe('Firebase Util Test Suite', () => {

    test('login should throw error with wrong credential', async () => {
        const { currentUser, logout, login } = useAuth();
        let error = '';

        try{
            await login('test@test.com', 'admin123')
        } catch (err) {
            error = err.toString();
        }
    })

})