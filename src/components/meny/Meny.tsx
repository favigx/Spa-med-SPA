interface Props {
    setPage: ((page: string) => void),
}

function Meny(props: Props) {
    return ( 
        <div>
            <button onClick={() => props.setPage("home")}>Hem</button>
            <button onClick={() => props.setPage("book")}>Boka tid</button>
            <button onClick={() => props.setPage("about")}>Om oss</button>
        </div>
     );
}

export default Meny;