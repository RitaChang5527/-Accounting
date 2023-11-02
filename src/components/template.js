import React, { useEffect, useState } from "react";
import classes from "./template.module.css";
import { db } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";

function Accounting() {


  const [recordList, setRecordList] = useState([]);

  const [transactionType, setTransactionType] = useState("income");
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");

  const recordCollectionRef = collection(db, "records");

  const handleSubmit = async () => {
    try {
      await addDoc(recordCollectionRef, {
        type: transactionType,
        amount: amount,
        item: item,
      });
      getRecordList();
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    const getRecordList = async () => {
      try {
        const data = await getDocs(recordCollectionRef);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRecordList(filterData);
      } catch (err) {
        console.error(err);
      }
    };
    getRecordList();
  }, [handleSubmit]);


const handleDelete = async (id) => {
  const recordDoc = doc(db, "records", id);
  await deleteDoc(recordDoc);
};

  const calculateTotal = () => {
    let totalIncome = 0;
    let totalExpense = 0;
    recordList.map((records) => {
      if (records.type === "income"){
        totalIncome += parseInt(records.amount, 10);
      }else if(records.type === "expense"){
        totalExpense -= parseInt(records.amount, 10);
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
          {recordList.map((records, index) => {
            let amountClass;
            return (
              <li key={index}>
                <div className={classes.info}>
                  <span className={amountClass}>{records.amount}</span>
                  <span className={classes.item}>{records.item}</span>
                </div>
                <button onClick={() => handleDelete(records.id)}>删除</button>
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
