import React from "react";

const ProgramList = ({ programs, onSelectProgram }) => {
    return (
        <div className="program-list-container">
            <h2>Programs List</h2>
            {programs.length > 0 ? (
                programs.map((program) => (
                    <div
                        key={program.id}
                        className="program-list-item"
                        onClick={() => onSelectProgram(program)}
                    >
                        <h3>{program.name}</h3>
                        <p>
                            <strong>Domain:</strong> {program.domain}
                        </p>
                        <p>
                            <strong>Price:</strong> INR {program.price}
                        </p>
                        {/* Add other program details as needed */}
                    </div>
                ))
            ) : (
                <p>No programs available.</p>
            )}
        </div>
    );
};

export default ProgramList;
