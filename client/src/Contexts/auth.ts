import { atom } from "recoil";

const authContext = atom<string>({
    key: 'authContext',
    default: ""
})

export default authContext;