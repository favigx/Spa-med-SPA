import './meny.css';

interface Props {
    setPage: ((page: string) => void),
}

function Meny(props: Props) {
    return ( 
        <div className="header">
            <button className='button' onClick={() => props.setPage("home")}>Hem</button>
            <button className='button' onClick={() => props.setPage("packages")}>Spa paket</button>
            <button className='button' onClick={() => props.setPage("booking")}>Boka tid</button>
            <button className='button' onClick={() => props.setPage("about")}>Om oss</button>
        </div>
     );
}

export default Meny;