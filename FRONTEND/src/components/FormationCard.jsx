import React from "react";

function FormationCard({ formation }) {
    return (
        <div className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">{formation.title}</h3>
            <p>{formation.description}</p>
        </div>
    );
}

export default FormationCard;
