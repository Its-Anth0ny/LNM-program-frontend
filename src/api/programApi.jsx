const BASE_URL = "http://localhost:3000"; // Replace with your backend URL

const programApi = {
    // Fetch all programs from the backend
    getAllPrograms: async (searchTerm) => {
        try {
            const queryParams = searchTerm
                ? `?search=${encodeURIComponent(searchTerm)}`
                : "";
            const response = await fetch(`${BASE_URL}/programs${queryParams}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching programs:", error);
            throw error; // Propagate the error to the caller
        }
    },

    // Create a new program on the backend
    createProgram: async (programData) => {
        try {
            const response = await fetch(`${BASE_URL}/programs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(programData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error creating program:", error);
            throw error;
        }
    },

    // Update an existing program on the backend
    updateProgram: async (programData) => {
        try {
            const response = await fetch(
                `${BASE_URL}/programs/${programData.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(programData),
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error updating program:", error);
            throw error;
        }
    },

    // Delete a program on the backend
    deleteProgram: async (programId) => {
        try {
            const response = await fetch(`${BASE_URL}/programs/${programId}`, {
                method: "DELETE",
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error deleting program:", error);
            throw error;
        }
    },
};

export default programApi;
