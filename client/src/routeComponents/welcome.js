function Welcome() {
    return ( 
        <div className='mainPageContainer' style={{maxWidth: "800px", margin: "auto"}}>
            <img src="./arrow_s.jpg" style={{height: "50px",margin: "auto"}}></img>
            <h3 style={{fontFamily: "Bahnschrift", fontWeight: "bold", width: "50%", margin: "auto", lineHeight: "50px"}}>
            Get hands on movies and shows that are worth of your attention and have a message to pass on.
            </h3>
            <img src="./arrow_l.png" style={{margin: "auto", height:"400px",marginTop: "20px"}}></img>
            <br></br>
            <a href="/reco">
                <img src="./start_button.png" style={{height: "150px", marginTop: "100px"}}></img>
            </a>
        </div>
     );
}

export default Welcome;