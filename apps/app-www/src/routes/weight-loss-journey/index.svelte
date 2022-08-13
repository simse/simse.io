<script context="module" lang="ts">
    interface Metric {
        id: string;
        value: number;
        name: string;
        unit: string;
        timestamp: string;
    }

    interface MetricGroup {
        [key: string]: Array<Metric>
    }

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ fetch }: any) {
		let metrics: MetricGroup = await fetch('https://weight.simse.io/grouped').then((res: any) => res.json());

        // sort metrics by date
        Object.keys(metrics).forEach(group => {
            metrics[group] = metrics[group].sort((a: Metric, b: Metric): number => {
                let dateA = Date.parse(a.timestamp)
                let dateB = Date.parse(b.timestamp)

                if (dateA > dateB) {
                    return 1
                }

                if (dateA < dateB) {
                    return -1
                }

                return 0
            })
        })

        let weights = metrics["weight_body_mass"]
    
        let summary = {
            weights,
            current_weight: weights[weights.length-1]
        }

		return {
			props: {
				metrics,
                summary
			}
		};
	}
</script>

<script lang="ts">
    export let metrics: any;
    export let summary: any;

    // breadcrumbs
    import { setBreadcrumbs } from "$lib/breadcrumbs"
    setBreadcrumbs([["/weight-loss-journey", "Weight Loss Journey"]])

    let roundNumber = (num: number): number => {
        return Math.round((num + Number.EPSILON) * 10) / 10
    }

    let displayMetric = (metric: Metric): string => {
        return `${roundNumber(metric.value)}${metric.unit}`
    }
</script>

<div class="pt-16">
    <h1 class="text-3xl mb-4">Weight Loss Tracker™ 9800</h1>

    <a href="/weight-loss-journey/huh" class="hover:underline text-blue-700">Huh ..?</a>

    <!-- quick metrics -->
    <div class="flex mt-16 border-t">
        <div class="p-8 border-r my-4 first:pl-0 w-64">
            <p>Current Weight</p>
            <h1 class="text-4xl">{ displayMetric(summary["current_weight"]) }</h1>
        </div>
    </div>
</div>