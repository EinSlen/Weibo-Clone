let user;
export const Setuser = (name, email, password) => {
    user = [name, email, password]
}
export const getUser = () => {
    return user;
}