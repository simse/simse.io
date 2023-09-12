<script lang="ts">
    import type { BodyMetrics, Measurement } from './bodyResponse';

    export let metric: Measurement[];
    export let title: string;
    export let modifier: (metric: Measurement) => Measurement = (metric: Measurement) => metric;
    export let expectedDirection: 'up' | 'down' | 'na' = 'down';

    const latest = metric[metric.length - 1];

    const latestDelta = Math.round((metric[metric.length - 1].value - metric[metric.length - 2].value) * 10) / 10;

    const color = (): string => {
        if (expectedDirection === 'up') {
            return latestDelta > 0 ? 'text-green-400' : 'text-red-400';
        } else if (expectedDirection === 'down') {
            return latestDelta > 0 ? 'text-red-400' : 'text-green-400';
        } else {
            return 'text-zinc-400';
        }
    }
</script>

<div class=" bg-zinc-800 px-4 py-3">
    <h2 class="font-bold text-lg mb-3">{title}</h2>

    <p class="font-light text-5xl mb-2">{modifier(latest).value}{modifier(latest).unit}</p>

    <p class={`${color()} font-bold`}>{latestDelta > 0 ? '+' : ''}{latestDelta}{modifier(metric[0]).unit}</p>
</div>