import React, { useState, useEffect } from 'react';
import ProgramList from './ProgramList';
import ProgramForm from './ProgramForm';
import programApi from '../api/programApi';
import ProgramDetails from './ProgramDetails';
import { useUserContext } from '../UserContext';
import '../dashboard.css';


const ProgramsDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [availableDomains, setAvailableDomains] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useUserContext();
  useEffect(() => {
    const fetchPrograms = async () => {
      const programsData = await programApi.getAllPrograms();
      setPrograms(programsData);
      const domains = [...new Set(programsData.map(program => program.domain))];
      setAvailableDomains(domains);
    };
    fetchPrograms();
  }, []);


  useEffect(() => {
    const filtered = programs.filter(
      (program) =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDomain ? program.domain === selectedDomain : true)
    );
    setFilteredPrograms(filtered);
  }, [searchTerm, selectedDomain, programs]);


  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
    setIsEditing(false);
  };


  const handleCreateProgram = async (programData) => {
    await programApi.createProgram(programData);
    const updatedPrograms = await programApi.getAllPrograms();
    setPrograms(updatedPrograms);
    // Update available domains
    const domains = [...new Set(updatedPrograms.map(program => program.domain))];
    setAvailableDomains(domains);
    setIsFormVisible(false);
  };


  const handleUpdateProgram = async (programData) => {
    if (programData.ownerUsername === user.username) {
      await programApi.updateProgram(programData);
      const updatedPrograms = await programApi.getAllPrograms();
      setPrograms(updatedPrograms);
      setSelectedProgram(null);
      const domains = [...new Set(updatedPrograms.map(program => program.domain))];
      setAvailableDomains(domains);
      setIsFormVisible(false);
    }
    else {
      console.log("not allowed");
    }
  };


  const handleEdit = (program) => {
    setSelectedProgram(program);
    setIsEditing(true);
    setIsFormVisible(true);
  };


  const handleDeleteProgram = async (programData, programId) => {
    if (programData.ownerUsername === user.username) {
      await programApi.deleteProgram(programData, programId);
      const updatedPrograms = await programApi.getAllPrograms();
      setPrograms(updatedPrograms);
      // Update available domains
      const domains = [...new Set(updatedPrograms.map(program => program.domain))];
      setAvailableDomains(domains);
      setIsFormVisible(false);
    }
    else {
      console.log("not allowed")
    }
  };


  const handleDomainFilter = (domain) => {
    setSelectedDomain(domain);
  };
  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setSelectedProgram(null);
  };



  return (
    <div className="App">
      <div className="header-container">
        <h1>Welcome, {user?.username || 'Guest'}! LNMIIT Program Dashboard</h1>
      </div>      
      <div style={{ display: 'flex' }}>
        <div style={{ width: '30%', padding: '20px' }}>

          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div>
            <label>Filter by Domain:</label>
            <select value={selectedDomain} onChange={(e) => handleDomainFilter(e.target.value)}>
              <option value="">All Domains</option>
              {availableDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleToggleForm}>{isFormVisible ? 'Hide Form' : 'Add Program'}</button>
        </div>
        <div style={{ width: '70%', padding: '20px' }}>
          <ProgramList programs={filteredPrograms} onSelectProgram={handleSelectProgram} />
          {isFormVisible && (
            <ProgramForm
              program={selectedProgram}
              onCreateProgram={handleCreateProgram}
              onUpdateProgram={handleUpdateProgram}
              onDeleteProgram={handleDeleteProgram}
              availableDomains={availableDomains}
              ownerUsername={user?.username}
              isEditMode={isEditing}

            />
          )}

        </div>
        {/* )} */}
        <ProgramDetails program={selectedProgram} onEdit={handleEdit} />
      </div>
    </div>
    // </div>
  );
};


export default ProgramsDashboard;