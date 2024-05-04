import { useState, useEffect } from "react";
import { useUserContext } from "../UserContext";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

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
        <div className="">
            <label>Program Name:</label>
            <Input
                type="text"
                value={formData.name || ""}
                onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                }
            />

            <label>Price:</label>
            <Input
                type="number"
                value={formData.price || ""}
                onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                }
            />

            <label>Domain:</label>
            <Input
                type="text"
                value={formData.domain || ""}
                onChange={(e) =>
                    setFormData({ ...formData, domain: e.target.value })
                }
            />

            <label>Owner Username:</label>
            <Input
                type="text"
                value={ownerUsername || user.username}
                disabled // Disable editing
            />

            <label>Mode:</label>
            <RadioGroup
                defaultValue="offline"
                value={formData.programType}
                onChange={(e) =>
                    setFormData({ ...formData, programType: e.target.value })
                }
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="open">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="offline" id="offline" />
                    <Label htmlFor="offline">Offline</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hybrid" id="hybrid" />
                    <Label htmlFor="hybrid">Hybrid</Label>
                </div>
            </RadioGroup>

            <Label>Registrations:</Label>
            <RadioGroup
                defaultValue="open"
                value={formData.registrations}
                onChange={(e) =>
                    setFormData({ ...formData, registrations: e.target.value })
                }
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="open" id="open" />
                    <Label htmlFor="open">Open</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="closed" id="closed" />
                    <Label htmlFor="closed">Closed</Label>
                </div>
            </RadioGroup>

            <label>Description:</label>
            <Textarea
                value={formData.description || ""}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }
            ></Textarea>

            <Label>Placement Assurance:</Label>
            <RadioGroup
                defaultValue="yes"
                value={formData.placementAssurance}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        placementAssurance: e.target.value,
                    })
                }
            >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yse">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">No</Label>
                </div>
            </RadioGroup>

            <label>Image URL:</label>
            <Input
                type="text"
                value={formData.imageUrl || ""}
                onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                }
            />

            <label>University Name:</label>
            <Input
                type="text"
                value={formData.universityName || ""}
                onChange={(e) =>
                    setFormData({ ...formData, universityName: e.target.value })
                }
            />

            <label>Faculty Profile:</label>
            <Input
                type="text"
                value={formData.facultyProfile || ""}
                onChange={(e) =>
                    setFormData({ ...formData, facultyProfile: e.target.value })
                }
            />

            <label>Learning Hours:</label>
            <Input
                type="number"
                value={formData.learningHours || ""}
                onChange={(e) =>
                    setFormData({ ...formData, learningHours: e.target.value })
                }
            />

            <label>Duration:</label>
            <Input
                type="text"
                value={formData.duration || ""}
                onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                }
            />

            <label>Certificate/Diploma:</label>
            <Input
                type="text"
                value={formData.certificate || ""}
                onChange={(e) =>
                    setFormData({ ...formData, certificate: e.target.value })
                }
            />

            <label>Eligibility Criteria:</label>
            <Textarea
                value={formData.eligibilityCriteria || ""}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        eligibilityCriteria: e.target.value,
                    })
                }
            ></Textarea>

            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleDelete}>Delete</Button>
            {formData && formData.id && (
                <Button onClick={handleUpdate}>Update</Button>
            )}
        </div>
    );
};

export default ProgramForm;
