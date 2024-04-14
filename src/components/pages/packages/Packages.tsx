import './packages.css';

function Packages() {
    return ( 
        <div className='packages'>
             <div>
            <h2>Paket</h2>
            <h3>Vi har två typer av paket att erbjuda, Lyx eller Poormans-spa!</h3>
        </div>

        <div className='container'>
        <div className='lyx'>
            <img className='img1' src="src\components\pages\packages\luxury.jpg" alt="Lyx" />
            <p>Lyxpaketet erbjuder massage och tillgång till poolområdet.</p><br/>
            <p>Kocken kommer att tillaga underbara tilltugg</p>
        </div>

        <div className='poormansspa'>
            <img className='img2' src="src\components\pages\packages\poormansspa.jpg" alt="Poormansspa" />
            <p>Poormans-spa-paket erbjuder endast tillgång till poolområdet</p><br/>
            <p>Du får ingen mat</p>
        </div>
        </div>
        </div>
      
     );
}

export default Packages;