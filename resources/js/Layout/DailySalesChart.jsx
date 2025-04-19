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

export default function DailySalesChart({ dailySales }) {
    if (!dailySales || dailySales.length === 0) {
        return <p>Loading chart...</p>;
    }

    const data = {
        labels: dailySales.map((sale) => sale.product.product_name),
        datasets: [
            {
                label: "Sales Amount",
                data: dailySales.map((sale) => Number(sale.total_sales)),
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
            x: { beginAtZero: true, title: { display: true, text: "Sales Amount (₱)" } },
            y: { title: { display: true, text: "Product Names" } },
        },
    };

    return (
        <div className="w-full p-3">
            <Bar data={data} options={options} />
        </div>
    );
}
