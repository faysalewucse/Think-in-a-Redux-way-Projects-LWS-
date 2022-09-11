import React from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Transactions from "../components/Transactions/Transactions";
import Pagination from "../components/ui/Pagination";

export default function AllTransactions() {
  return (
    <Layout>
      <Navbar />
      <Transactions limited={false} />
      <Pagination />
    </Layout>
  );
}
