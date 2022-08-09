import axios from "../axios";

class UserService {

    postUser = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('users', data)
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve(err)
                })
        });
        return await promise;
    }

    putUser = async (data, id) => {
        const promise = new Promise((resolve, reject) => {
            axios.put(`users/${id}`, data)
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve(err)
                })
        });
        return await promise;
    }

    fetchUsers = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('users')
                .then((res) => {
                    return resolve(res);
                })
                .catch((err)=>{
                    return resolve(err);
                })
        });
        return await promise;
    }

    deleteUser = async (id) => {
        const promise = new Promise((resolve, reject) => {
            axios.delete(`users/${id}`)
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

export default new UserService();