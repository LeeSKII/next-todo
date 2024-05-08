"use client";
import React from "react";
import { CSSProperties } from "react";

interface CSSWithVars extends CSSProperties {
  "--value": string | number;
}

type DurationType = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function CountDown({
  durationInfo,
  endDateTime,
}: {
  durationInfo: DurationType;
  endDateTime: string;
}) {
  const { years, months, days, hours, minutes, seconds } = durationInfo;
  const [year, setYear] = React.useState(years);
  const [month, setMonth] = React.useState(months);
  const [day, setDay] = React.useState(days);
  const [hour, setHour] = React.useState(hours);
  const [minute, setMinute] = React.useState(minutes);
  const [second, setSecond] = React.useState(seconds);

  React.useEffect(() => {
    const secondTimer = setTimeout(() => {
      if (second > 0) {
        setSecond(second - 1);
      } else {
        if (minute > 0) {
          setMinute(minute - 1);
        } else {
          setMinute(59);
          if (hour === 0) {
            setHour(23);
            setDay(day - 1);
          } else {
            setHour(hour - 1);
          }
        }
        setSecond(59);
      }
    }, 1000);
    return () => {
      clearTimeout(secondTimer);
    };
  });
  const yearStyle: CSSWithVars = {
    "--value": year,
  };
  const monthStyle: CSSWithVars = {
    "--value": month,
  };
  const dayStyle: CSSWithVars = {
    "--value": day,
  };
  const hourStyle: CSSWithVars = {
    "--value": hour,
  };
  const minuteStyle: CSSWithVars = {
    "--value": minute,
  };
  const secondStyle: CSSWithVars = {
    "--value": second,
  };

  return (
    <div>
      <div className="text-2xl">倒计时：{endDateTime}</div>
      <span className="countdown font-mono text-2xl">
        {year > 0 && (
          <>
            <span style={yearStyle}></span>Y
          </>
        )}
        {month > 0 && (
          <>
            <span style={monthStyle}></span>M
          </>
        )}
        {day > 0 && (
          <>
            <span style={dayStyle}></span>D
          </>
        )}
        {hour >= 0 && (
          <>
            <span style={hourStyle}></span>h
          </>
        )}
        {minute >= 0 && (
          <>
            <span style={minuteStyle}></span>m
          </>
        )}
        {second >= 0 && (
          <>
            <span style={secondStyle}></span>s
          </>
        )}
      </span>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        {year > 0 && (
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={yearStyle}></span>
            </span>
            years
          </div>
        )}
        {month > 0 && (
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span style={monthStyle}></span>
            </span>
            months
          </div>
        )}
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={dayStyle}></span>
          </span>
          days
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={hourStyle}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={minuteStyle}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={secondStyle}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
}
