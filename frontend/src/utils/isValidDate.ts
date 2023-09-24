export const isValidDate = (year: string, month: string, day: string) => {
    // First, we check if they can be converted to integers
    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);

    if (isNaN(y) || isNaN(m) || isNaN(d)) {
        return false;
    }

    // Check if the year, month, and day are in valid ranges
    if (y < 1900 || y > 2100) return false; // Adjust the year range as needed
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;

    // Now we'll leverage the Date object to see if it's a valid date
    const date = new Date(y, m - 1, d); // month is 0-indexed in JavaScript's Date

    // If the date object's year, month, or day doesn't match, it's not a valid date
    if (date.getFullYear() !== y || date.getMonth() + 1 !== m || date.getDate() !== d) {
        return false;
    }

    return true;
};


