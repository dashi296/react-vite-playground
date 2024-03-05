import dayjs from "dayjs";
import { HTMLAttributes } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CustomIconButton from "../CustomIconButton";
type CustomCalendarProps = {
  activeStartDate: Date;
  value: Date[];
  onChange: (dates: Date[]) => void;
  onChangeActiveStartDate?: (date: Date) => void;
};

export default function CustomCalendar({
  activeStartDate,
  value,
  onChange,
  onChangeActiveStartDate,
}: CustomCalendarProps) {
  const startDate = dayjs(activeStartDate).startOf("month");
  const startDateWeekday = startDate.day();
  const daysInMonth = startDate.daysInMonth();

  const getDays = () => {
    return Array.from({ length: daysInMonth }).map((_, i) => {
      return startDate.add(i, "day").toDate();
    });
  };

  const isSelected = (date: Date) => {
    return value.some((d) => dayjs(d).isSame(date, "day"));
  };

  const onClickDay = (date: Date) => {
    if (isSelected(date)) {
      onChange(value.filter((d) => !dayjs(d).isSame(date, "day")));
    } else {
      onChange([...value, date]);
    }
  };

  const moveMonth = (num: number) => {
    if (onChangeActiveStartDate) {
      onChangeActiveStartDate(startDate.add(num, "month").toDate());
    }
  };

  const toPrevMonth = () => {
    moveMonth(-1);
  };
  const toNextMonth = () => {
    moveMonth(1);
  };

  return (
    <div className="w-[350px]">
      <div className="flex justify-center items-center">
        <CustomIconButton
          icon={<IoIosArrowBack className="text-blue-600" />}
          onClick={toPrevMonth}
        />
        <div className="w-40 py-1 font-bold text-center border rounded-full">
          {startDate.format("YYYY年M月")}
        </div>
        <CustomIconButton
          icon={<IoIosArrowForward className="text-blue-600" />}
          onClick={toNextMonth}
        />
      </div>
      <CustomCalendarWeekHeaderRow />
      <div className="flex flex-wrap">
        {Array.from({ length: startDateWeekday }).map((_, i) => (
          <CustomCalendarDivBaseDay key={i} />
        ))}
        {getDays().map((date, j) => (
          <CustomCalendarDay
            key={j}
            isSelected={isSelected(date)}
            date={date}
            onClick={() => {
              onClickDay(date);
            }}
          />
        ))}
      </div>
    </div>
  );
}

type CustomCalendarWeekHeaderDayProps = HTMLAttributes<HTMLDivElement>;
function CustomCalendarWeekHeaderDay(props: CustomCalendarWeekHeaderDayProps) {
  return (
    <CustomCalendarDivBaseDay
      {...props}
      className={`font-bold ${props.className}`}
    />
  );
}

function CustomCalendarWeekHeaderRow() {
  return (
    <div className="flex">
      <CustomCalendarWeekHeaderDay className="text-red-600">
        日
      </CustomCalendarWeekHeaderDay>
      <CustomCalendarWeekHeaderDay>月</CustomCalendarWeekHeaderDay>
      <CustomCalendarWeekHeaderDay>火</CustomCalendarWeekHeaderDay>
      <CustomCalendarWeekHeaderDay>水</CustomCalendarWeekHeaderDay>
      <CustomCalendarWeekHeaderDay>木</CustomCalendarWeekHeaderDay>
      <CustomCalendarWeekHeaderDay>金</CustomCalendarWeekHeaderDay>
      <CustomCalendarWeekHeaderDay className="text-blue-600">
        土
      </CustomCalendarWeekHeaderDay>
    </div>
  );
}

type CustomCalendarDayProps = HTMLAttributes<HTMLButtonElement> & {
  isSelected: boolean;
  date: Date;
  onClick: (date: Date) => void;
};

function CustomCalendarDay({
  isSelected,
  date,
  ...props
}: CustomCalendarDayProps) {
  const isSubday = dayjs(date).day() === 0;
  const isSaturaday = dayjs(date).day() === 6;
  return (
    <CustomCalendarDayButtonBase
      {...props}
      className={`${
        isSubday ? "text-red-600" : isSaturaday ? "text-blue-600" : ""
      } ${isSelected ? "bg-blue-500 text-white" : ""}`}
    >
      {date.getDate()}
    </CustomCalendarDayButtonBase>
  );
}

type CustomCalendarDivBaseDayProps = HTMLAttributes<HTMLDivElement>;
function CustomCalendarDivBaseDay(props: CustomCalendarDivBaseDayProps) {
  return (
    <div
      {...props}
      className={`w-1/7 aspect-square flex items-center justify-center rounded-none ml-[-1px] mb-[-1px] ${props.className}`}
    />
  );
}

type CustomCalendarDayButtonBaseProps = HTMLAttributes<HTMLButtonElement>;
function CustomCalendarDayButtonBase(props: CustomCalendarDayButtonBaseProps) {
  return (
    <button
      {...props}
      className={`w-1/7 aspect-square flex items-center justify-center rounded-none border ml-[-1px] mb-[-1px] ${props.className}`}
    />
  );
}
