"use client";
import React from "react";
import { Calendar } from "antd";
import { Calendar as MobileCalendar } from "antd-mobile";
import locale from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import type { CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { ConfigProvider } from "antd";

dayjs.locale("zh-cn");

export default function App() {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const today = dayjs();

  return (
    <ConfigProvider locale={locale}>
      <div className="mx-3">
        <MobileCalendar
          className="md:hidden"
          selectionMode="single"
          onChange={(e) => {
            console.log(e);
          }}
          renderLabel={(date) => {
            if (dayjs(date).isSame(today, "day")) return "今天";
            if (date.getDay() === 0 || date.getDay() === 6) {
              return (
                <div className="w-1 h-1 bg-green-400 rounded shadow-md"></div>
              );
            }
          }}
        />
        <Calendar onPanelChange={onPanelChange} className="hidden md:block" />
      </div>
    </ConfigProvider>
  );
}
