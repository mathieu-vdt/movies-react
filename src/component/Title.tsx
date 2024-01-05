export interface TitlePropsI {
    titre?: string
}

export default function Title({titre}: TitlePropsI): JSX.Element {
    return <h1>{titre}</h1>
}
