import React from "react";
import Balance from "../components/Balance";
import Form from "../components/Form";
import Transactions from "../components/Transactions/Transactions";
import ViewAll from "../components/ViewAll";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Balance />
      <Form />
      <Transactions limited={true} />
      <ViewAll />
    </Layout>
  );
}
