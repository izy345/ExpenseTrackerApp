export function getFormattedDate(dateInput) {
    try {
        // Try the primary method: adjust for timezone offset.
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) {
            throw new Error('Invalid Date');
        }
        const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, "0");
        const day = String(localDate.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    } catch (error) {
        // Fallback formatting (for example with an ISO string like "2025-04-02T00:00:00Z")
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) {
            return ""; // or handle error appropriately.
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
}

export function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}