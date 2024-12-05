// src/app/NotificationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface NotificationContextType {
  notificationCount: number;
  setNotificationCount: (count: number) => void;
  url: string;
  orders:number,
  setOrders:(value: number) =>void,
  lengths:number, setLenghts:(count:number)=>void,
  sizes:string, setSizes:(text:string)=>void,
  korzina: number;
  setKorzina: (count: number) => void;
  setUrl: (value: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [korzina, setKorzina] = useState(0);
  const [orders, setOrders] = useState<number>(300)
  const [sizes, setSizes] = useState("");
  const [lengths, setLenghts] = useState(0);
  const [url, setUrl] = useState("female");

  return (
    <NotificationContext.Provider
      value={{ notificationCount, orders, setOrders, setNotificationCount, lengths, setLenghts, url, setSizes, sizes, setUrl, korzina, setKorzina }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
