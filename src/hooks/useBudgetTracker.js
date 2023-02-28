import React, { useState, createContext, useContext } from 'react';

// custom hook 来管理共用的 state
// React Context API 同步數據
const BudgetTrackerContext = createContext();
export const useBudgetTracker = () => useContext(BudgetTrackerContext);

export const BudgetTrackerProvider = ({ children }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [costFood, setCostFood] = useState(0);
  const [costTraffic, setCostTraffic] = useState(0);
  const [costPlay, setCostPlay] = useState(0);
  const [costOther, setCostOther] = useState(0);

  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState({ type: '支出', subType: '' });
  const [showForm, setShowForm] = useState(false);
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

  const [isEditingFood, setIsEditingFood] = useState(false);
  const [isEditingTraffic, setIsEditingTraffic] = useState(false);
  const [isEditingPlay, setIsEditingPlay] = useState(false);
  const [isEditingOther, setIsEditingOther] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingGender, setIsEditingGender] = useState(false);
  const [isEditingBirthday, setIsEditingBirthday] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

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
        user, setUser,
        userData, setUserData,
        showLogin, setShowLogin,

        username, setUsername,
        gender, setGender,
        birthday, setBirthday,
        email, setEmail,
        password, setPassword,

        isEditingName, setIsEditingName,
        isEditingGender, setIsEditingGender,
        isEditingBirthday, setIsEditingBirthday,
        isEditingEmail, setIsEditingEmail,
        isEditingPassword, setIsEditingPassword,

        showForm, setShowForm,
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
        costOther, setCostOther
        
      }}
    >
      {children}
    </BudgetTrackerContext.Provider>
  );
};
