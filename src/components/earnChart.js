import React from "react";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const EarnChart = () => {
    const {
        earnSalary, setEarnSalary,
        earnStock, setEarnStock,
        earnGift, setEarnGift,
        earnOther, setEarnOther } = useBudgetTracker();

    const localSalary = localStorage.getItem('earn薪資');
    const localStock = localStorage.getItem('earn獲利');
    const localGift = localStorage.getItem('earn禮物');
    const localEarnOther = localStorage.getItem('earn其他');

    let totalEarn = (earnSalary + earnStock + earnGift + earnOther)
        || (localSalary + localStock + localGift + localEarnOther);
    const data = {
        labels: ['薪資', '獲利', '禮物', '其他'],
        datasets: [
            {
                label: ' $ ',
                data: [
                    earnSalary || localSalary,
                    earnStock || localStock,
                    earnGift || localGift,
                    earnOther || localEarnOther
                ],
                backgroundColor: ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1'],
                hoverBackgroundColor: ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1'],
                borderWidth: 0,
                hoverOffset: 30,

            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left',
                labels: {
                    font: {
                        size: 16,
                        weight: 'bold',
                    },
                },
            },
        },
    };

    return (
        <div>
            {totalEarn > 0 ? (
                <Pie data={data} options={options} className='pieChart' />
            ) : (
                <div className="nodata">need more data</div>
            )}
        </div>
    )
}

export default EarnChart;