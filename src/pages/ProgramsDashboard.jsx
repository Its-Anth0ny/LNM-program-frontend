import { useState, useEffect } from "react";
import ProgramList from "../components/ProgramList";
import ProgramForm from "../components/ProgramForm";
import programApi from "../api/programApi";
import { useUserContext } from "../UserContext";
import { Input } from "../components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { TypeAnimation } from "react-type-animation";

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
        <div className="min-h-screen p-6 light:bg-gray-100">
            <div className="mx-auto space-y-6 max-w-7xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold light:text-gray-900">
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                `Welcome, ${
                                    user?.username.toUpperCase() || "User"
                                }`,
                                1000,
                            ]}
                            speed={1}
                            cursor={false}
                        />
                    </h1>
                    <div className="flex items-center space-x-6">
                        <Input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[250px]"
                        />
                        <div className="flex items-center space-x-4">
                            {/* <label className="light:text-gray-700">
                                Filter by Domain:
                            </label> */}
                            <Select
                                value={selectedDomain}
                                onValueChange={(value) => {
                                    handleDomainFilter(value);
                                }}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="All Domains" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem
                                            value={null}
                                            className="font-semibold"
                                        >
                                            All
                                        </SelectItem>
                                        {availableDomains.map(
                                            (domain, index) => (
                                                <SelectItem
                                                    key={index}
                                                    value={domain}
                                                >
                                                    {domain}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Dialog onOpenChange={handleEdit}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    Add Program
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[425px] w-full max-h-[calc(100vh-100px)] h-full overflow-hidden p-6 light:bg-white rounded-lg shadow-lg">
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
                            <DialogClose asChild accessKey=""></DialogClose>
                        </Dialog>
                    </div>
                </div>
                <div className="p-6 rounded-lg shadow-lg light:bg-white">
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
