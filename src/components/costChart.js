import React from "react";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const CostChart = () => {
    const {

        costFood, setCostFood,
        costTraffic, setCostTraffic,
        costPlay, setCostPlay,
        costOther, setCostOther,

        costApparel, setCostApparel,
        costHousing, setCostHousing,
        costEducate, setCostEducate,
        costSavings, setCostSavings,
        
    } = useBudgetTracker();

    const localFood = localStorage.getItem('cost飲食');
    const localTraffic = localStorage.getItem('cost交通');
    const localPlay = localStorage.getItem('cost娛樂');
    const localOther = localStorage.getItem('cost其他');
    const localApparel = localStorage.getItem('cost治裝');
    const localHousing = localStorage.getItem('cost居住');
    const localEducate = localStorage.getItem('cost教育');
    const localSavings = localStorage.getItem('cost儲蓄');

    let totalCost = (costFood + costTraffic + costPlay + costOther + costApparel + costHousing + costEducate + costSavings)
        || (localFood + localTraffic + localPlay + localOther + localApparel + localEducate + localHousing + localSavings);

    const data = {
        labels: ['飲食', '治裝', '居住', '交通', '教育', '娛樂', '儲蓄', '其他'],
        datasets: [
            {
                label: ' $ ',
                data: [
                    costFood || localFood,
                    costApparel || localApparel,
                    costHousing || localHousing,
                    costTraffic || localTraffic,
                    costEducate || localEducate,
                    costPlay || localPlay,
                    costSavings || localSavings,
                    costOther || localOther
                ],
                backgroundColor: ['#753422', '#B05B3B', '#D79771', '#FAD6A5',
                    '#7D5A50', '#B4846C', '#E5B299', '#FDF0E0'],
                hoverBackgroundColor: ['#753422', '#B05B3B', '#D79771', '#FAD6A5',
                    '#7D5A50', '#B4846C', '#E5B299', '#FDF0E0'],
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
            {totalCost > 0 ? (
                <Pie data={data} options={options} className='pieChart' />
            ) : (
                <div className="nodata">No data to display</div>
            )}
        </div>
    )
}

export default CostChart;