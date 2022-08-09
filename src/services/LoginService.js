import axios from "../axios";

class LoginService{
    postLogin = async (data) => {
        const promise = await new Promise((resolve, reject) => {
            axios.post('auth/login', data)
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve(err);
                })
        });
        return await promise;
    }
}
export default new LoginService();