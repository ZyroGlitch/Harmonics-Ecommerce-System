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

export default function PaymentChart({ orderStatus, totalCountOrders }) {
    if (!orderStatus || orderStatus.length === 0) {
        return <p>Loading chart...</p>;
    }

    const data = {
        labels: orderStatus.map((status) => status.payment_method),
        datasets: [
            {
                label: "Order Status %",
                data: orderStatus.map((status) =>
                    ((Number(status.total) / totalCountOrders) * 100).toFixed(2)
                ),
                backgroundColor: orderStatus.map((status) => {
                    if (status.payment_method.toLowerCase() === "gcash") {
                        return "#0078FF"; // GCash theme color
                    } else if (status.payment_method.toLowerCase() === "paymaya") {
                        return "#00C4A7"; // PayMaya theme color
                    }
                    return "#d1d5db"; // Default gray color for others
                }),
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
