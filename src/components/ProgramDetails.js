// ProgramDetails.js
import React from 'react';


import { useUserContext } from '../UserContext';

const ProgramDetails = ({ program, onEdit }) => {
  const { user } = useUserContext();

  if (!program) {
    return <div>Select a program to view details</div>;
  }

  const { id, ownerUsername, name, ...programDetails } = program;

  const detailsToShow = Object.entries(programDetails).map(([key, value]) => (
    <div key={key}>
      <strong>{key}:</strong> {value}
    </div>
  ));
  return (
    <div>
      <h2>{program.name}</h2>
      {detailsToShow}
      {ownerUsername === user?.username && (
        <button onClick={() => onEdit(program)}>Edit</button>
      )}
    </div>
  );
};

export default ProgramDetails;