import React from 'react'
import temp1 from "../assets/astronaut.png";
import Header from '../components/Navbar'

export default function AboutPage() {
  return (

    <div>
        <Header />
        <div className="row align-items-center" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "85vh" }}>
                <div className="col-6 col-md-2">
                        <div className="card text-center">
                            <img className="card-img-top" height="200" src={temp1} alt="Card image cap"/>
                            <div className="card-body">
                                <h3 className="card-title">Kimsrun Lim</h3>
                                <h6 className="card-subtitle mb-2 text-muted">Project mananger</h6>
                                <p className="card-text">Some quick  the card's content.e quick  
                                the card's contents content.e quick  the 
                
                                ntent.e quick  the card's content.e quick  the card's content.e quic
                                k  the card's content.
                                
                                lrikjtgaowei</p>
                            </div>
                        </div>
                    </div>
                

            
        <div className="col-12 col-md-8">
            <div className="row mb-4">
                <div className="col">
                    <div className="col">
                        <div className="card text-center">
                            <img className="card-img-top" height="200" src={temp1} alt="Card image cap"/>
                            <div className="card-body">
                                <h3 className="card-title">Fiona Zhao</h3>
                                <h6 className="card-subtitle mb-2 text-muted">Web</h6>
                                <p className="card-text">Front-End</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="col">
                        <div className="card text-center">
                            <img className="card-img-top" height="200" src={temp1} alt="Card image cap"/>
                            <div className="card-body">
                                <h3 className="card-title">Soleil Cordray</h3>
                                <h6 className="card-subtitle mb-2 text-muted">Web</h6>
                                <p className="card-text">Front-End</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="col">
                        <div className="card text-center">
                            <img className="card-img-top" height="200" src={temp1} alt="Card image cap"/>
                            <div className="card-body">
                                <h3 className="card-title">Frost Austin</h3>
                                <h6 className="card-subtitle mb-2 text-muted">Web</h6>
                                <p className="card-text">API / Front-end</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="row">
            <div className="col">
                    <div className="col">
                        <div className="card text-center">
                            <img className="card-img-top" height="200" src={temp1} alt="Card image cap"/>
                            <div className="card-body">
                                <h3 className="card-title">Luka Telebak</h3>
                                <h6 className="card-subtitle mb-2 text-muted">Mobile</h6>
                                <p className="card-text">Front-End</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="col">
                        <div className="card text-center">
                            <img className="card-img-top" height="200" src={temp1} alt="Card image cap"/>
                            <div className="card-body">
                                <h3 className="card-title">Tanner Assenmacher</h3>
                                <h6 className="card-subtitle mb-2 text-muted">Mobile</h6>
                                <p className="card-text">Database</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="col">
                        <div className="card text-center">
                            <img className="card-img-top" height="200" src={temp1} alt="Card image cap"/>
                            <div className="card-body">
                                <h3 className="card-title">Hani Bdeir</h3>
                                <h6 className="card-subtitle mb-2 text-muted">Mobile</h6>
                                <p className="card-text">Front-End</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        
        </div>
        </div>
    </div>
  )
}
