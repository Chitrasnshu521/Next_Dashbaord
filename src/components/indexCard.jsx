import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { SiFuturelearn } from "react-icons/si";
import BlurText from "@/components/BlurText"; // Import the reusable text effect component
import FadeContent from "./ui/FadeContent";

const cardData = [
  { title: "Total Revenue", amount: "$45,231.89", content: "Revenue details here", icon: <SiFuturelearn /> },
  { title: "Total Expenses", amount: "$12,345.67", content: "Expense details here", icon: <SiFuturelearn /> },
  { title: "Net Profit", amount: "$32,886.22", content: "Profit details here", icon: <SiFuturelearn /> },
  { title: "Net Loss", amount: "$000000", content: "Loss details here", icon: <SiFuturelearn /> },
];

const IndexCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cardData.map((item, index) => (
        <FadeContent
          key={index} // Move key here
          blur={true}
          duration={1000}
          easing="ease-out"
          initialOpacity={0}
        >
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <BlurText text={item.title} className="text-sm" />
                <CardDescription>{item.icon}</CardDescription>
              </div>
              <CardTitle className="text-2xl">
                <BlurText text={item.amount} animateBy="letters" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BlurText text={item.content} className="text-black-50 text-xs" />
            </CardContent>
          </Card>
        </FadeContent>
      ))}
    </div>
  );
};


export default IndexCard;
