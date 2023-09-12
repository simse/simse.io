<script lang="ts">
    import type { BodyMetrics, Measurement } from './bodyResponse';
    import SummaryCard from './SummaryCard.svelte';

    export let metrics: BodyMetrics;

    const fatPercentageModifier = (metric: Measurement) => {
        const weight = metrics.weight.find(weight => weight.date === metric.date);

        if (!weight) {
            return metric;
        }

        const modifiedMetric: Measurement = {
            value: Math.round((metric.value / weight.value * 100) * 10) / 10,
            unit: '%',
            date: metric.date
        };

        return modifiedMetric;
    };
</script>


<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <SummaryCard title="Weight" metric={metrics.weight}  />

    <SummaryCard title="Fat Percentage" metric={metrics.fat} modifier={fatPercentageModifier}  />

    <SummaryCard title="Muscle Mass" metric={metrics.muscle} expectedDirection='up' />

    <SummaryCard title="Water Weight" metric={metrics.water} expectedDirection='na' />
</div>