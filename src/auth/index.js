import { API } from '../config';

export const signup = user => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log("Using mock signup fallback due to offline API");
            if (typeof window !== 'undefined') {
                const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
                const exists = mockUsers.find(u => u.email === user.email);
                if (exists) {
                    return { error: "Email is already registered. Please login." };
                }
                mockUsers.push({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: 0
                });
                localStorage.setItem('mock_users', JSON.stringify(mockUsers));
                return { user: { name: user.name, email: user.email } };
            }
            return { error: "Local signup failed" };
        });
};

export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log("Using mock signin fallback due to offline API");
            if (typeof window !== 'undefined') {
                // Check local registered users first
                const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
                
                // Also support default admin login out of the box
                if (user.email === 'admin@gmail.com' && user.password === 'password123') {
                    return {
                        token: "mock-jwt-token-xyz",
                        user: { _id: "admin-id", name: "Admin Explorer", email: "admin@gmail.com", role: 1 }
                    };
                }
                
                const matched = mockUsers.find(u => u.email === user.email && u.password === user.password);
                if (matched) {
                    return {
                        token: "mock-jwt-token-123",
                        user: { _id: "mock-id-" + matched.email, name: matched.name, email: matched.email, role: matched.role || 0 }
                    };
                }
                
                return { error: "Invalid credentials. Try admin@gmail.com / password123 or register a new account." };
            }
            return { error: "Local signin failed" };
        });
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout response', response);
            })
            .catch(err => {
                console.log("Offline signout completed locally");
            });
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
