import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

export default function SalesChart({ topSellingProducts }) {
    if (!topSellingProducts || topSellingProducts.length === 0) {
        return <p>Loading chart...</p>;
    }

    const data = {
        labels: topSellingProducts.map((item) => item.product.product_name),
        datasets: [
            {
                label: "Units Sold",
                data: topSellingProducts.map((item) => Number(item.total_quantity)),
                backgroundColor: "rgba(34, 197, 94, 0.8)", // Fresh green (Tailwind Green-500)
                borderColor: "rgba(34, 197, 94, 1)", // Darker green border
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: { display: false }, // Removed the legend
            tooltip: { enabled: true },
            datalabels: { display: false }, // 👈 this disables data labels inside bars
        },
        scales: {
            x: { beginAtZero: true, title: { display: true, text: "Number of Sales" } },
            y: { title: { display: true, text: "Product Names" } },
        },
    };

    return (
        <div className="w-full p-3">
            <Bar data={data} options={options} />
        </div>
    );
}
