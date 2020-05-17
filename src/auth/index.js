import {API} from '../config'

export const signUp = (user) => {
    console.log(user);

    return(
        fetch(`${API}/signup`,{
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        })
    );
}