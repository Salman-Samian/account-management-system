export function getDatesRange(): DateRangeFilters {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    return {
        Yesterday: yesterday,
        Today: today,
        Tomorrow: tomorrow
    }
}

