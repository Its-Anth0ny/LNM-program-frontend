import { useState, useEffect } from "react";
import { useUserContext } from "../UserContext";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ScrollArea } from "./ui/scroll-area";

const ProgramForm = ({
    program,
    onCreateProgram,
    onUpdateProgram,
    onDeleteProgram,
    ownerUsername,
    isEditMode,
}) => {
    const [formData, setFormData] = useState(program || {});
    const { user } = useUserContext();

    useEffect(() => {
        setFormData(program || {});
    }, [program]);

    const handleSave = () => {
        const programData = {
            ...formData,
            ownerUsername: ownerUsername || user.username,
        };

        if (formData && formData.id) {
            onUpdateProgram(programData);
        } else {
            onCreateProgram(programData);
        }
    };

    const handleDelete = () => {
        if (formData && formData.id) {
            onDeleteProgram(formData.id);
        } else {
            console.error("Cannot delete program without an ID");
        }
    };

    const handleUpdate = () => {
        handleSave();
    };

    return (
        <ScrollArea className="w-full h-full scrollbar-hidden">
            <div className="w-full pl-2 pr-6 space-y-2">
                <Label>Program Name:</Label>
                <Input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                />

                <Label>Price:</Label>
                <Input
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                    }
                />

                <Label>Domain:</Label>
                <Input
                    type="text"
                    value={formData.domain || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, domain: e.target.value })
                    }
                />

                <Label>Owner Username:</Label>
                <Input
                    type="text"
                    value={ownerUsername || user.username}
                    disabled // Disable editing
                />

                <Label>Mode:</Label>
                <RadioGroup
                    defaultValue=""
                    value={formData.programType}
                    onClick={(e) => {
                        setFormData({
                            ...formData,
                            programType: e.target.value,
                        });
                    }}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="r1" />
                        <Label htmlFor="open">Online</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="offline" id="r2" />
                        <Label htmlFor="offline">Offline</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hybrid" id="r3" />
                        <Label htmlFor="hybrid">Hybrid</Label>
                    </div>
                </RadioGroup>

                <Label>Registrations:</Label>
                <RadioGroup
                    defaultValue=""
                    value={formData.registrations}
                    onClick={(e) =>
                        setFormData({
                            ...formData,
                            registrations: e.target.value,
                        })
                    }
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="open" id="r1" />
                        <Label htmlFor="open">Open</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="closed" id="r2" />
                        <Label htmlFor="closed">Closed</Label>
                    </div>
                </RadioGroup>

                <Label>Description:</Label>
                <Textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                ></Textarea>

                <Label>Placement Assurance:</Label>
                <RadioGroup
                    defaultValue=""
                    value={formData.placementAssurance}
                    onClick={(e) =>
                        setFormData({
                            ...formData,
                            placementAssurance: e.target.value,
                        })
                    }
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="r1" />
                        <Label htmlFor="yse">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="r2" />
                        <Label htmlFor="no">No</Label>
                    </div>
                </RadioGroup>

                <Label>Image URL:</Label>
                <Input
                    type="text"
                    value={formData.imageUrl || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                    }
                />

                <Label>University Name:</Label>
                <Input
                    type="text"
                    value={formData.universityName || ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            universityName: e.target.value,
                        })
                    }
                />

                <Label>Faculty Profile:</Label>
                <Input
                    type="text"
                    value={formData.facultyProfile || ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            facultyProfile: e.target.value,
                        })
                    }
                />

                <Label>Learning Hours:</Label>
                <Input
                    type="number"
                    value={formData.learningHours || ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            learningHours: e.target.value,
                        })
                    }
                />

                <Label>Duration:</Label>
                <Input
                    type="text"
                    value={formData.duration || ""}
                    onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                    }
                />

                <Label>Certificate/Diploma:</Label>
                <Input
                    type="text"
                    value={formData.certificate || ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            certificate: e.target.value,
                        })
                    }
                />

                <Label>Eligibility Criteria:</Label>
                <Textarea
                    value={formData.eligibilityCriteria || ""}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            eligibilityCriteria: e.target.value,
                        })
                    }
                ></Textarea>
                <div className="flex space-x-2">
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                    {formData && formData.id && (
                        <Button onClick={handleUpdate}>Update</Button>
                    )}
                </div>
            </div>
        </ScrollArea>
    );
};

export default ProgramForm;
