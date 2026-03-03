
export const formatMonthYear = (dateString: string | undefined) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
    };

    return date.toLocaleDateString("en-US", options);
}