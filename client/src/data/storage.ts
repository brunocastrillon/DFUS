export const saveToken = (loggedInUser: any) => {
    if (!loggedInUser.accessToken) return null;

    localStorage.setItem("metamask:auth", loggedInUser.accessToken);
}

export const clearToken = () => {
    localStorage.removeItem("metamask:auth");
}

export const getToken = () => {
    const token = localStorage.getItem("metamask:auth");
    if (!token) return null;
    
    return `${token}`;
}

export const getHeaders = () => {
    return {
        'headers': {
            'Authorization': `Bearer ${getToken()}`
        }
    }
}