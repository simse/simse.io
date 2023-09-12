export interface Measurement {
    value: number;
    unit: 'kg' | '%' | 'cm';
    date: Date;
}

export interface BodyMetrics {
    weight: Measurement[];
    muscle: Measurement[];
    fat: Measurement[];
    water: Measurement[];
}
