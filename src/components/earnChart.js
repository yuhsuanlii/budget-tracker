import React from "react";
import { useBudgetTracker } from '../hooks/useBudgetTracker';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const EarnChart = () => {
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
        labels: ['薪資', '獲利', '其他1', '其他2'],
        datasets: [
            {
                label: ' $ ',
                data: [100, 50, 20, 80],
                backgroundColor: ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1'],
                hoverBackgroundColor: ['#3C6255', '#61876E', '#A6BB8D', '#EAE7B1'],
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
            {/* ) : (
                <div className="nodata">No data to display</div>
            )} */}
        </div>
    )
}

export default EarnChart;