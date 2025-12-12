import React, { useEffect, useState } from "react";
import FormationCard from "./components/FormationCard";
import ProjectCard from "./components/ProjectCard";

function App() {
    const [formations, setFormations] = useState([]);
    
    useEffect(() => {
        fetch("https://api.maceratshub.onrender.com/formations")
            .then(res => res.json())
            .then(data => setFormations(data));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">MACERAT.S Hub</h1>
            <h2 className="text-xl mb-2">Formations disponibles :</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formations.map(f => <FormationCard key={f.id} formation={f} />)}
            </div>
        </div>
    );
}

export default App;
