interface WindowProps {
    title?: string;
    zIndex: number;
    onClose: () => void;
    onTouch: () => void;
};

export type {
    WindowProps
};