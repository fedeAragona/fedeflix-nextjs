//I MANUALLY SET THE USER IDENTIFIER
const USER_KEY = 'user';


// Función para establecer una cookie
const setCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

// Función para obtener el valor de una cookie
const getCookie = (name) => {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
};

// Función para borrar una cookie
const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};




//FUNCTION THAT VERIFIES THE USER LOGIN SAVING THE DATA AND USING THE EMAIL AS TOKEN SAVING SUCH INFORMATION LOCALLY
export const login = (email, password) => {
    if (!email || !password) return false;

    setCookie(USER_KEY, JSON.stringify({ email }), 30);
    return true;
};

//FUNCTION THAT VERIFIES THE USER REGISTER SAVING THE DATA AND USING THE EMAIL AS TOKEN SAVING SUCH INFORMATION LOCALLY
export const register = (email, password, passwordConfirm) => {
    if (!email || !password || !passwordConfirm) return false;
    setCookie(USER_KEY, JSON.stringify({ email }), 30);
    return true;
};

//FUNCTION THAT CLEANS UP THE LOCALSTORAGE USER RECORD
export const logout = () => {
    deleteCookie(USER_KEY);
};


//IN THIS FUNCTION YOU GET STORED USER INFORMATION
export const getUser = () => {
    const userCookie = getCookie(USER_KEY);

    if (!userCookie) return null;

    try {
        return JSON.parse(userCookie);
    } catch (err) {
        return null;
    }
};

export default {logout, register, getUser};