import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { fetcher } from "../axios.conf";
import { useNavigate } from "react-router-dom";
export function useAuth() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetcher.get('/api/users').then(res => {
            if (res.status === 200) {
                setUser(res.data.user);
            }
        })
            .catch(err => {
                console.log(`error occured: ${err}`);
                navigate('/login')
            })
    }, [])

    return user
}