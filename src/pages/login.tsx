// LoginPage.tsx
import React, { useState } from 'react';
import '../App.css';
import { useAppDispatch } from '../app/hooks';
import { login, setError } from '../contexts/auth';

const LoginPage: React.FC = () => {
    const [apiKey, setApiKey] = useState('');
    const [idAccount, setIdAccount] = useState('');
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTgyNGZlYzRkYWVkYjU4ZGU2YzA3MzA3MmViM2M0NiIsInN1YiI6IjY1OTZiY2NlZWY5ZDcyMmJhNjEyYjUyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dkQIy1fjTsBVn4FcPE2G1y0aE8niaFG6VOrqjYsOJxM'
            }
          };
          
          try {
            const response = await fetch(`https://api.themoviedb.org/3/account/${idAccount}`, options);
            const data = await response.json();
            // Dispatch an action with the fetched data
            dispatch(login(
                {
                    api_key:apiKey,
                    account_id:idAccount,
                    loading: false,
                    error: ""
                }
            ));
        } catch (err) {
            dispatch(setError(String(err)));
        }
    };

    return (
        <div className="login-container">
            <h2>Se connecter</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="apikey">API KEY:</label>
                <input
                    type="text"
                    id="apikey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <label htmlFor="idAccount">ACCOUNT ID:</label>
                <input
                    type="text"
                    id="idAccount"
                    value={idAccount}
                    onChange={(e) => setIdAccount(e.target.value)}
                />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
    };

export default LoginPage;

