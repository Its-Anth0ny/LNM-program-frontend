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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { ScrollArea } from "@radix-ui/react-scroll-area";

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
        <div className="grid w-full grid-cols-1 gap-4 grid-rows-12 max-w-screen">
            <div className="flex items-center justify-between row-span-2 px-6 py-8">
                <Input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-[250px]"
                />
                <div className="flex items-center justify-center row-span-2 gap-2">
                    <label>Filter by Domain:</label>
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
            </div>
            <div className="row-span-10">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" onClick={handleToggleForm}>
                            Add Program
                        </Button>
                    </DialogTrigger>
                    {isEditing ? (
                        <DialogContent className="max-w-[425px] w-full max-h-[calc(100vh-100px)] h-full overflow-hidden">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">
                                    Form
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
                    ) : (
                        <DialogContent className="max-w-[425px] w-full max-h-[calc(100vh-100px)] h-full overflow-hidden">
                            <DialogHeader>
                                <DialogTitle className="text-2xl">
                                    Program Details
                                </DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>

                            <ProgramDetails
                                program={selectedProgram}
                                onEdit={handleEdit}
                            />
                        </DialogContent>
                    )}
                </Dialog>
                <ProgramList
                    programs={filteredPrograms}
                    onSelectProgram={handleSelectProgram}
                />
            </div>
        </div>
    );
};

export default ProgramsDashboard;
