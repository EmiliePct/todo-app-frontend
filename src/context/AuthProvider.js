// import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react',
// import api from '../api' //?

// const AuthContext = createContext(undefined);

// export const useAuth = () => {
//     const authContext = useContext(AuthContext);

//     if (!authContext) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }

//     return authContext;
// }

// const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState();

//     //??
//     useEffect(() => {
//         const fetchMe = async () => {
//             try {
//                 const response = await api.get('/api/me');
//                 setToken(response.data.accessToken);
//             } catch {
//                 setToken(null);
//             }
//         };

//         fetchMe();
//     }, []);

//     // ajoute le token en autorisation des requêtes s'il est en mémoire
//     useLayoutEffect(() => { // useLayout Effect au lieu de useEffect pour s'assurer que cet effet est traité avant d'autres dans d'autres composants en dessous
//         const authInterceptor = api.interceptors.request.use((config) => {
//             config.headers.Authorization =
//                 !config._retry && token
//                     ? `Bearer ${token}`
//                     : config.headers.Authorization;
//             return config;
//         });

//         return () => {
//             api.interceptors.request.eject(authInterceptor);
//         }
//     }, [token]);
// }