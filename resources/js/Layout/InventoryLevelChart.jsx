import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function InventoryLevelChart({ inventoryData }) {
    if (!inventoryData || inventoryData.length === 0) {
        return <p>Loading chart...</p>;
    }

    const data = {
        labels: inventoryData.map((item) => item.product_name), // Product Categories
        datasets: [
            {
                label: "Available Stock",
                data: inventoryData.map((item) => Number(item.stocks)),
                backgroundColor: inventoryData.map((item) =>
                    item.stocks < 51 ? "rgba(239, 68, 68, 0.8)" : "rgba(34, 197, 94, 0.8)"
                ), // Red if stock < 50, Green otherwise
                borderColor: inventoryData.map((item) =>
                    item.stocks < 51 ? "rgba(220, 38, 38, 1)" : "rgba(22, 163, 74, 1)"
                ), // Darker Red and Green Borders
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: "y", // Horizontal bars
        responsive: true,
        plugins: {
            legend: { display: true, position: "top" },
            title: { display: true, text: "Inventory Levels", font: { size: 18 } },
            tooltip: { enabled: true },
        },
        scales: {
            x: { beginAtZero: true, title: { display: true, text: "Number of Stocks" } },
            y: { title: { display: true, text: "Product Names" } },
        },
    };

    return (
        <div className="w-full p-3">
            <Bar data={data} options={options} />
        </div>
    );
}
