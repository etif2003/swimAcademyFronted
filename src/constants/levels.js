export const LEVEL_OPTIONS = [
    { value: "All", label: "כל הרמות" },
    { value: "Beginner", label: "מתחילים" },
    { value: "Advanced", label: "מתקדמים" },
    { value: "Professional", label: "מקצועי" },
];

export const LEVEL_MAP = {
    All: { label: "כל הרמות", className: "level-all" },
    Beginner: {
        label: "מתחילים",
        className: "level-beginner",
    },
    Advanced: {
        label: "מתקדמים",
        className: "level-advanced",
    },
    Professional: {
        label: "מקצועי",
        className: "level-professional",
    },
};

export const LEVEL_VALUES = LEVEL_OPTIONS.map(a => a.value);
