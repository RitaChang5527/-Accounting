import React, { useState } from "react";
import classes from './template.module.css';

function Accounting() {
    const [transactionType, setTransactionType] = useState("income");
    const [amount, setAmount] = useState("");
    const [item, setItem] = useState("");
    const [log, setLog] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLog([
      ...log,
      ` ${transactionType === "income" ? "+" : "-"}${amount}, ${item}`,
    ]);
    setTransactionType("income");
    setAmount("");
    setItem("");
  };

  const handleDelete = (index) => {
    const updatedLog = [...log];
    updatedLog.splice(index, 1);
    setLog(updatedLog);
  };

  const calculateTotal = () => {
    let totalIncome = 0;
    let totalExpense = 0;
    log.forEach((entry) => {
      const parts = entry.split(',');
      if (parts.length >= 1) {
        console.log("111")
        console.log(entry)
        const amountWithSign = parts[0].trim();
        const amount = parseInt(amountWithSign, 10);
        console.log(amountWithSign)
        console.log(amount)
        if (amountWithSign.startsWith("+")) {
          totalIncome += amount;
        } else if (amountWithSign.startsWith("-")) {
          totalExpense -= amount;
        }
      }
    });
  
    return totalIncome - totalExpense;
  };
  
  const netIncome = calculateTotal();

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="income">收入</option>
            <option value="expense">支出</option>
          </select>
        </label>
        <label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="輸入金額"
            required
          />
        </label>
        <label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="輸入項目"
            required
          />
        </label>
        <button type="submit">新增項目</button>
      </form>
      <hr />
      <div className={classes.record}>
        <ul>
        {log.map((entry, index) => {
          const [amount, item] = entry.split(', ');
          const amountValue = parseInt(amount, 10);
          const amountClass = amountValue >= 0 ? classes.positiveAmount : classes.negativeAmount;
          return (
            <li key={index}>
              <div className={classes.info}>
              <span className={`${amountClass} ${classes.amount}`}>{amount}</span>
                <span className={classes.item}>{item}</span>
              </div>
              <button onClick={() => handleDelete(index)}>删除</button>
            </li>
          );
        })}
        </ul>
      </div>
      <div>
        <h2>小計：{netIncome}</h2>
      </div>
    </div>
  );
}

export default Accounting;
