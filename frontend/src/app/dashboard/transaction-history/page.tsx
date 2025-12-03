import TransactionCard from "@/components/TransactionCard";
import React from "react";

// type Transaction = {
//   _id: string;
//   userId: string;
//   listingId: string;
//   amount: number;
//   currency: string;
//   status: "pending" | "success" | "failed" | "refunded" | string;
//   createdAt: string;
//   updatedAt: string;
// };

const Transactions = () => {
  const transactionData: any = [
    {
      _id: "6929618f101d4f54d9f4f909",
      userId: "68e9439e27842ad16132f16e",
      listingId: "692960fba3d0efd22462751a",
      amount: 199,
      currency: "INR",
      // stripeSessionId:
      //   "cs_test_a16cDNjIdiaIqYSMaQQXFgvZISrT0GTTwBlpmIu1is6ORMlJuOt8KZ3SgZ",
      status: "success",
      // paymentIntentId: "pi_3SYNJsSDPu2vjllb1P7eWyIF",
      createdAt: "2025-11-28T08:47:11.496+00:00",
      updatedAt: "2025-11-28T08:47:11.496+00:00",
    },
  ];
  return (
    <div>
      {transactionData.map((transaction: any) => (
        <TransactionCard key={transaction?._id} transaction={transaction} />
      ))}
    </div>
  );
};

export default Transactions;
