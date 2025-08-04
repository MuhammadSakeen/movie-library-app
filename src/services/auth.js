import {getAuth} from "firebase/auth"
import app from "./firebase.js"

const auth = getAuth(app)

export default auth