export const ValidateEmail = (email) =>{
    const regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    return regex.test(email);
}
export const getIntials = (name) => {
    if(!name) return "";

    const words = name.split(" ");
    let intials=words[0][0]+words[words.length - 1][0];
    return intials.toUpperCase();
}
export const backendPort = "https://notedeckbackend.vercel.app";
