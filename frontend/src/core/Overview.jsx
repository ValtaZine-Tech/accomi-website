/* eslint-disable no-unused-vars */
import Chart, { Colors } from 'chart.js/auto';
import './styles.css'
// import '../components/Charts'
import { Skeleton } from 'antd';
import { useEffect, useRef } from 'react';
import { LoadingOutlined } from '@ant-design/icons'


const Overview = () => {

    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);

    useEffect(() => {
        const data = [
            { x: 'Jan', net: 100, cogs: 50, gm: 50 },
            { x: 'Feb', net: 120, cogs: 55, gm: 75 },
            { x: 'Mar', net: 120, cogs: 55, gm: 75 },
            { x: 'Apr', net: 100, cogs: 50, gm: 50 },
            { x: 'May', net: 120, cogs: 55, gm: 75 },
            { x: 'Jun', net: 120, cogs: 55, gm: 75 },
            { x: 'Jul', net: 100, cogs: 50, gm: 50 },
            { x: 'Aug', net: 120, cogs: 55, gm: 75 },
            { x: 'Sep', net: 120, cogs: 55, gm: 75 },
            { x: 'Oct', net: 100, cogs: 50, gm: 50 },
            { x: 'Nov', net: 120, cogs: 55, gm: 75 },
            { x: 'Dec', net: 120, cogs: 55, gm: 75 },
        ];

        const barLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

        const pieData = [300, 150, 50]; // Example data for the pie chart
        const pieLabels = ['Hostels', 'Apartments', 'Rentals'];

        Chart.register(Colors);

        const barChart = new Chart(barChartRef.current, {
            type: 'bar',
            data: {
                labels: barLabels,
                datasets: [
                    {
                        label: 'Hostels',
                        data: data,
                        parsing: { yAxisKey: 'net' },
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                    {
                        label: 'Apartments',
                        data: data,
                        parsing: { yAxisKey: 'cogs' },
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    },
                    {
                        label: 'Rentals',
                        data: data,
                        parsing: { yAxisKey: 'gm' },
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    },
                ],
            },
        });

        // Pie Chart
        const pieChart = new Chart(pieChartRef.current, {
            type: 'pie',
            data: {
                labels: pieLabels,
                datasets: [
                    {
                        data: pieData,
                        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
                    },
                ],
            },
        });

        // Cleanup on unmount
        return () => {
            barChart.destroy();
            pieChart.destroy();
        };
    }, []);

    return (
        <>
            <div className="top-section">
                <div className="ov-card"></div>
                <div className="ov-card"></div>
                <div className="ov-card"></div>
                <div className="ov-card"></div>

            </div>


            <div className="chart-section">
                <div className="chart-card">
                    <canvas ref={barChartRef} height={240} id="acquisitions">
                        <LoadingOutlined />
                    </canvas>
                </div>
                <div className="chart-card">
                    <canvas ref={pieChartRef} id="acquisitions">
                        <LoadingOutlined />
                    </canvas>
                </div>
            </div>
        </>
    )
}

export default Overview