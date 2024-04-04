interface WindowProps {
    title?: string;
    active: boolean;
    onClose: () => void;
    onTouch: () => void;
};

export type {
    WindowProps
};