import React from "react";

function ProjectCard({ project }) {
    return (
        <div className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg">{project.title}</h3>
            <p>{project.description}</p>
        </div>
    );
}

export default ProjectCard;
