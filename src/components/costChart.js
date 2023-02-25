import React from "react";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const CostChart = () => {
    const {
        showForm, setShowForm,
        expenses, setExpenses,
        amount, setAmount,
        description, setDescription,
        category, setCategory,
        date, setDate,
        costs, setCosts,
        budget, setBudget,
        allocatedBudget, setAllocatedBudget,
        bcategory, setbCategory,
        food, setFood,
        traffic, setTraffic,
        play, setPlay,
        other, setOther,
        isEditingFood, setIsEditingFood,
        isEditingTraffic, setIsEditingTraffic,
        isEditingPlay, setIsEditingPlay,
        isEditingOther, setIsEditingOther,
        selectedBudgetId, setSelectedBudgetId,

        totalIncome, setTotalIncome,
        totalExpense, setTotalExpense,
        costFood, setCostFood,
        costTraffic, setCostTraffic,
        costPlay, setCostPlay,
        costOther, setCostOther } = useBudgetTracker();

    let totalCost = costFood + costTraffic + costPlay + costOther;
    const data = {
        labels: ['飲食', '交通', '娛樂', '其他'],
        datasets: [
            {
                label: ' $ ',
                data: [100, 50, 200, 100],
                backgroundColor: ['#753422', '#B05B3B', '#D79771', '#FFEBC9'],
                hoverBackgroundColor: ['#753422', '#B05B3B', '#D79771', '#FFEBC9'],
                borderWidth: 0,
                hoverOffset: 30,

                // hoverBorderWidth: 5,
                // hoverBackgroundColor: '#FAFAF9',
                // hoverBorderColor:['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left',
                labels: {
                    // This more specific font property overrides the global property
                    // padding: 10,
                    // textAlign: 'left',
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
            {/* {totalCost > 0 ? ( */}
                <Pie data={data} options={options} className='pieChart' />
            {/* ) : ( */}
                {/* <div className="nodata">No data to display</div> */}
            {/* )} */}
        </div>
    )
}

export default CostChart;