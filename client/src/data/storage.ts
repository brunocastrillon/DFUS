export const saveToken = (loggedInUser: { token: { split: (arg0: string) => [any, any, any]; }; }) => {
    if (!loggedInUser.token) return null;

    const [token0, token1, token2] = loggedInUser.token.split('.');

    localStorage.setItem("tk0", token0);
    localStorage.setItem("tk1", token1);
    localStorage.setItem("tk2", token2);
}

export const clearToken = () => {
    localStorage.removeItem("tk0");
    localStorage.removeItem("tk1");
    localStorage.removeItem("tk2");
}

export const getToken = () => {
    const token0 = localStorage.getItem("tk0");
    const token1 = localStorage.getItem("tk1");
    const token2 = localStorage.getItem("tk2");

    if (!token0 || !token1 || !token2) return null;

    return `${token0}.${token1}.${token2}`;
}

export const getHeaders = () => {
    return {
        'headers': {
            'Authorization': `Bearer ${getToken()}`
        }
    }
}