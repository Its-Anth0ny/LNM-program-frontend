import { useState, useEffect } from "react";
import ProgramList from "../components/ProgramList";
import ProgramForm from "../components/ProgramForm";
import programApi from "../api/programApi";
import ProgramDetails from "../components/ProgramDetails";
import { useUserContext } from "../UserContext";
import { Input } from "../components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

const ProgramsDashboard = () => {
    const [programs, setPrograms] = useState([]);
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("");
    const [availableDomains, setAvailableDomains] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const { user } = useUserContext();

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const programsData = await programApi.getAllPrograms();
                setPrograms(programsData);
                const domains = [
                    ...new Set(programsData.map((program) => program.domain)),
                ];
                setAvailableDomains(domains);
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };
        fetchPrograms();
    }, []);

    useEffect(() => {
        const filtered = programs.filter(
            (program) =>
                program.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (!selectedDomain || program.domain === selectedDomain)
        );
        setFilteredPrograms(filtered);
    }, [searchTerm, selectedDomain, programs]);

    const handleSelectProgram = (program) => {
        setSelectedProgram(program);
        setIsEditing(false);
    };

    const handleCreateProgram = async (programData) => {
        try {
            await programApi.createProgram(programData);
            const updatedPrograms = await programApi.getAllPrograms();
            setPrograms(updatedPrograms);
            const domains = [
                ...new Set(updatedPrograms.map((program) => program.domain)),
            ];
            setAvailableDomains(domains);
        } catch (error) {
            console.error("Error creating program:", error);
        }
    };

    const handleUpdateProgram = async (programData) => {
        try {
            if (programData.ownerUsername === user.username) {
                await programApi.updateProgram(programData);
                const updatedPrograms = await programApi.getAllPrograms();
                setPrograms(updatedPrograms);
                setSelectedProgram(null);
                const domains = [
                    ...new Set(
                        updatedPrograms.map((program) => program.domain)
                    ),
                ];
                setAvailableDomains(domains);
            } else {
                console.log("Not allowed to update program");
            }
        } catch (error) {
            console.error("Error updating program:", error);
        }
    };

    const handleEdit = (program) => {
        setSelectedProgram(program);
        setIsEditing(true);
    };

    const handleDeleteProgram = async (programData) => {
        try {
            if (programData.ownerUsername === user.username) {
                await programApi.deleteProgram(programData.id);
                const updatedPrograms = await programApi.getAllPrograms();
                setPrograms(updatedPrograms);
                const domains = [
                    ...new Set(
                        updatedPrograms.map((program) => program.domain)
                    ),
                ];
                setAvailableDomains(domains);
            } else {
                console.log("Not allowed to delete program");
            }
        } catch (error) {
            console.error("Error deleting program:", error);
        }
    };

    const handleDomainFilter = (domain) => {
        setSelectedDomain(domain);
    };

    const handleToggleForm = () => {
        setSelectedProgram(null);
    };

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <div className="mx-auto space-y-6 max-w-7xl">
                <div className="flex items-center justify-between">
                    <Input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-xs"
                    />
                    <div className="flex items-center space-x-4">
                        <label className="text-gray-700">
                            Filter by Domain:
                        </label>
                        <Select
                            value={selectedDomain}
                            onChange={(e) => handleDomainFilter(e.target.value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All Domains" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Domain</SelectLabel>
                                    {availableDomains.map((domain) => (
                                        <SelectItem key={domain} value={domain}>
                                            {domain}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Add Program
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[425px] w-full max-h-[calc(100vh-100px)] h-full overflow-hidden p-6 bg-white rounded-lg shadow-lg">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">
                                    Program Form
                                </DialogTitle>
                                <DialogDescription>
                                    Add the program details below.
                                </DialogDescription>
                            </DialogHeader>
                            <ProgramForm
                                program={selectedProgram}
                                onCreateProgram={handleCreateProgram}
                                onUpdateProgram={handleUpdateProgram}
                                onDeleteProgram={handleDeleteProgram}
                                availableDomains={availableDomains}
                                ownerUsername={user?.username}
                                isEditMode={isEditing}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <ProgramList
                        programs={filteredPrograms}
                        onSelectProgram={handleSelectProgram}
                        selectedProgram={selectedProgram}
                        handleEdit={handleEdit}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProgramsDashboard;
