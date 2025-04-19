import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export default function OrderStatusChart({ orderStatus, totalCountOrders }) {
    if (!orderStatus || orderStatus.length === 0) {
        return <p>Loading chart...</p>;
    }

    const data = {
        labels: orderStatus.map((status) => status.order_status),
        datasets: [
            {
                label: "Order Status %",
                data: orderStatus.map((status) =>
                    ((Number(status.total) / totalCountOrders) * 100).toFixed(2)
                ),
                backgroundColor: [
                    "#4ade80", "#f87171", "#60a5fa", "#fbbf24", "#a78bfa",
                    "#f472b6", "#34d399", "#fb923c", "#38bdf8", "#facc15",
                ],
                borderColor: "#fff",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.formattedValue}%`,
                },
            },
            datalabels: {
                color: "#fff",
                formatter: (value) => `${value}%`,
                font: {
                    weight: "bold",
                    size: 18,
                },
            },
        },
    };

    return (
        <div className="w-full p-3">
            <Pie data={data} options={options} />
        </div>
    );
}
