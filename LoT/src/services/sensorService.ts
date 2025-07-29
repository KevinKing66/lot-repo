
const apiUrl = import.meta.env.VITE_API_URL;

export const getSensorAlertHistory = async (token: string) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const response = await fetch(`${apiUrl}/sensor/alert/history`, { headers });
    if (!response.ok) throw new Error("Error fetching sensor alert history");
    return await response.json();
};

export const getSensorHistory = async (deviceID: string, token: string) => {
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const response = await fetch(`${apiUrl}/sensor/history/${deviceID}`, { headers });
    if (!response.ok) {
        throw new Error("Failed to fetch sensor history");
    }
    return response.json();
};