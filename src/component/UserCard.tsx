import {UserI} from "../type/user.tsx";

export interface UserCardPropsI {
    user: UserI
}

export default function UserCard({user}: UserCardPropsI) {
    return (
        <ul>
            <li>{user.id}</li>
            <li>{user.email}</li>
        </ul>
    )
}
