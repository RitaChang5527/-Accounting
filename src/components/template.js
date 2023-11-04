import React, { useEffect, useState } from "react";
import classes from "./template.module.css";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Accounting() {
  const [recordList, setRecordList] = useState([]);

  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");

  const RecordCollectionRef = collection(db, "records");

  const getRecordList = async () => {
    try {
      const data = await getDocs(RecordCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecordList(filterData);
      console.log(filterData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRecordList();
  }, []);

  const onSubmitRecord = async () => {
    try {
      await addDoc(RecordCollectionRef, {
        type: type,
        amount: amount,
        item: item,
      });
      setAmount("");
      setItem("");
      getRecordList();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    console.log(typeof id);
    try {
      const recordDoc = doc(db, "records", id);
      console.log(typeof id);
      await deleteDoc(recordDoc);
      getRecordList();
    } catch (err) {
      console.error(err);
    }
  };

  const calculateTotal = () => {
    let totalIncome = 0;
    let totalExpense = 0;
    recordList.map((records) => {
      if (records.type === "income") {
        totalIncome += records.amount;
      } else if (records.type === "expense") {
        totalExpense += records.amount;
      }
    });
    return totalIncome - totalExpense;
  };

  const netIncome = calculateTotal();

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <select onChange={(e) => setType(e.target.value)}>
          <option value="income">收入</option>
          <option value="expense">支出</option>
        </select>
        <input
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
          value={amount}
          placeholder="輸入金額"
          required
        />
        <input
          type="text"
          onChange={(e) => setItem(e.target.value)}
          value={item}
          placeholder="輸入項目"
          required
        />
        <button onClick={onSubmitRecord}>新增項目</button>
      </div>

      <hr />
      <div className={classes.record}>
        <ul>
          {recordList.map((records, index) => {
            return (
              <li key={index}>
                <div className={classes.info}>
                <span className={records.type === "income" ? classes.positiveAmount : classes.negativeAmount}>
                  {records.type === "income" ? "+" : "-"}
                  {Math.abs(records.amount)}
                </span>
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
