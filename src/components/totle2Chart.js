import React, { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";

import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Totle2Chart = () => {
 
    const [monthExpenses, setMonthExpenses] = useState([]);
    const [monthIncomes, setMonthIncomes] = useState([]);
    const [months, setMonths] = useState(["07", "08", "09", "10", "11", "12"]);

    useEffect(() => {
        const fetchData = async () => {
            const firstDay = localStorage.getItem('firstDay');
            const uid = localStorage.getItem('uid');
            const year = firstDay.split("-")[0];

            const fetchedMonthExpenses = [];
            const fetchedMonthIncomes = [];

            for (const month of months) {
                if (firstDay && uid) {
                    const docId = year + "-" + month + "-01" + uid;
                    const budgetRef = doc(db, "total", docId);
                    const data = {
                        totalExpense: 0,
                        totalIncome: 0,
                        costFood: 0,
                        costTraffic: 0,
                        costPlay: 0,
                        costOther: 0,
                        costApparel: 0,
                        costHousing: 0,
                        costEducate: 0,
                        costSavings: 0,
                        earnSalary: 0,
                        earnStock: 0,
                        earnGift: 0,
                        earnOther: 0
                    };

                    try {
                        const docSnapshot = await getDoc(budgetRef);
                        if (docSnapshot.exists()) {
                            const expense = docSnapshot.data().totalExpense;
                            const income = docSnapshot.data().totalIncome;
                            fetchedMonthExpenses.push(expense);
                            fetchedMonthIncomes.push(income);
                        } else {
                            await setDoc(budgetRef, data);
                        }
                    } catch (error) {
                        console.error("Error getting document:", error);
                    }
                }
            }

            setMonthExpenses(fetchedMonthExpenses);
            setMonthIncomes(fetchedMonthIncomes);
        };

        fetchData();
    }, []);

    const differences = monthIncomes.map((monthIncome, index) => monthIncome - monthExpenses[index]);
    // console.log("下半年Expenses:", monthExpenses);
    // console.log("下半年Incomes:", monthIncomes);
    // console.log("下半年月結餘:", differences);

    const data = {
        labels: ['7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: [
            {
                type: 'line',
                label: '月結餘',
                // data: [170, 400, 250, 300, 80, 130],
                data: differences,
                backgroundColor: '#562B08aa',
                borderWidth: 3,
                borderColor: '#562B08',
                pointBorderWidth: 7,
                pointHoverBorderWidth: 10,
            },
            {
                type: 'bar',
                label: '總收入',
                // data: [550, 800, 750, 900, 450, 760],
                data: monthIncomes,
                backgroundColor: '#61876Eaa',
                hoverBackgroundColor: '#61876E',
                borderWidth: 3,
                borderColor: '#61876Eaa',
            },
            {
                type: 'bar',
                label: '總支出',
                // data: [745, 677, 583, 267, 599, 900],
                data: monthExpenses,
                backgroundColor: '#B05B3Baa',
                hoverBackgroundColor: '#B05B3B',
                borderWidth: 3,
                borderColor: '#B05B3Baa',
            },

        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
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
            {monthIncomes.some(income => income !== 0) && monthExpenses.some(expense => expense !== 0) ? (
                <Bar data={data} options={options} />
            ) : (
                <div className="nodata2">No data to display</div>
            )}
        </div>
    )
}

export default Totle2Chart;