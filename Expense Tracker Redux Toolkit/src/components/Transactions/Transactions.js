import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterLength } from "../../features/filter/filterSlice";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions({ limited }) {
  const dispatch = useDispatch();

  const { transactions, isLoading, isError } = useSelector(
    (state) => state.transaction
  );
  const { page, type, search, sortBy } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch, limited]);

  // decide what to render
  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError)
    content = <p className="error">There was an error occured</p>;

  if (!isLoading && !isError && transactions?.length > 0) {
    let reversed_transactions = [...transactions].reverse();
    if (search !== "")
      reversed_transactions = reversed_transactions.filter((transaction) =>
        transaction.name.includes(search)
      );
    if (sortBy !== "") {
      if (sortBy === "name") {
        reversed_transactions = reversed_transactions.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sortBy === "amount") {
        reversed_transactions = reversed_transactions.sort(
          (a, b) => a.amount - b.amount
        );
      }
      if (sortBy === "itoe" || sortBy === "etoi") {
        const income = reversed_transactions.filter(
          (transaction) => transaction.type === "income"
        );
        const expense = reversed_transactions.filter(
          (transaction) => transaction.type === "expense"
        );

        reversed_transactions =
          sortBy === "itoe" ? income.concat(expense) : expense.concat(income);
      }
    }
    if (type === "income")
      reversed_transactions = reversed_transactions.filter(
        (transaction) => transaction.type === "income"
      );
    else if (type === "expense")
      reversed_transactions = reversed_transactions.filter(
        (transaction) => transaction.type === "expense"
      );
    dispatch(setFilterLength(reversed_transactions.length));
    content = reversed_transactions.map((transaction, index) => {
      if (limited === true) {
        if (index <= 4)
          return <Transaction key={transaction.id} transaction={transaction} />;
        else return null;
      } else {
        const start = (page - 1) * 10;
        const end = page * 10;

        if (index >= start && index < end)
          return (
            <Transaction
              key={transaction.id}
              transaction={transaction}
              limited={false}
            />
          );
        return null;
      }
    });
  }

  if (
    (!isLoading && !isError && transactions?.length === 0) ||
    content.length === 0
  ) {
    content = <p>No transactions found!</p>;
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions min-h-fit">
        <ul>{content}</ul>
      </div>
    </>
  );
}
