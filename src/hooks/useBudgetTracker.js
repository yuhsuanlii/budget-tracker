import React, { useState, createContext, useContext } from 'react';

// custom hook 来管理共用的 state
// React Context API 同步數據
const BudgetTrackerContext = createContext();
export const useBudgetTracker = () => useContext(BudgetTrackerContext);

export const BudgetTrackerProvider = ({ children }) => {
  const [uid, setUid] = useState("");

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const [costFood, setCostFood] = useState(0);
  const [costTraffic, setCostTraffic] = useState(0);
  const [costPlay, setCostPlay] = useState(0);
  const [costOther, setCostOther] = useState(0);
  
  const [costApparel, setCostApparel] = useState(0);
  const [costHousing, setCostHousing] = useState(0);
  const [costEducate, setCostEducate] = useState(0);
  const [costSavings, setCostSavings] = useState(0);

  const [earnSalary, setEarnSalary] = useState(0);
  const [earnStock, setEarnStock] = useState(0);
  const [earnGift, setEarnGift] = useState(0);
  const [earnOther, setEarnOther] = useState(0);
 
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState({ type: '支出', subType: '' });
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  const [costs, setCosts] = useState([]); // 設定預算的陣列
  const [budget, setBudget] = useState(0); // 設定預算金額

  const [allocatedBudget, setAllocatedBudget] = useState(0); // 已分配出去的預算
  const [bcategory, setbCategory] = useState({ type: '支出', subType: '' });

  const [food, setFood] = useState(0);
  const [traffic, setTraffic] = useState(0);
  const [play, setPlay] = useState(0);
  const [other, setOther] = useState(0);

  const [apparel, setApparel] = useState(0);
  const [housing, setHousing] = useState(0);
  const [educate, setEducate] = useState(0);
  const [savings, setSavings] = useState(0);

  const [selectedBudgetId, setSelectedBudgetId] = useState(null);

  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showLogin, setShowLogin] = useState(true);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState({});

  return (
    <BudgetTrackerContext.Provider
      value={{

        uid, setUid,
        user, setUser,
        userData, setUserData,
        showLogin, setShowLogin,

        username, setUsername,
        gender, setGender,
        birthday, setBirthday,
        email, setEmail,
        password, setPassword,

        showForm, setShowForm,
        showEditForm, setShowEditForm,
        showLoginForm, setShowLoginForm,
        
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
        
        selectedBudgetId, setSelectedBudgetId,

        totalIncome, setTotalIncome,
        totalExpense, setTotalExpense,
        
        costFood, setCostFood,
        costTraffic, setCostTraffic,
        costPlay, setCostPlay,
        costOther, setCostOther,

        costApparel, setCostApparel,
        costHousing, setCostHousing,
        costEducate, setCostEducate,
        costSavings, setCostSavings,

        apparel, setApparel,
        housing, setHousing,
        educate, setEducate,
        savings, setSavings,

        earnSalary, setEarnSalary,
        earnStock, setEarnStock,
        earnGift, setEarnGift,
        earnOther, setEarnOther
      }}
    >
      {children}
    </BudgetTrackerContext.Provider>
  );
};
