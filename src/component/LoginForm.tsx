import {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {UserI} from "../type/user.tsx";

export interface LoginFormPropsI {
    setUser: Dispatch<SetStateAction<UserI>>
}

export default function LoginForm({setUser}: LoginFormPropsI) {

    const [localUser, setLocalUser] = useState<UserI>({} as UserI)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalUser(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setUser(localUser)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                       name="email" onChange={handleChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="plainPassword" onChange={handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
