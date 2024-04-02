import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
// 要件
// ページの中にカレンダーがある
// カレンダーは年月を切り替えることができる
// カレンダーでは複数の日付を選択できる
// 保存ボタンを押すと選択した日付の配列をconsole.logで表示する

// 追加情報
// スタイルは大雑把でOK
// selectedDatesという変数
// 日付を選択・データ構造は要件としては決まってない

// dayjsの使い方
// const today = dayjs(); // Dayjs型
// const days = today.daysInMonth(); // 日数
// const firstDay = today.startOf("month").day(); // 初日
// const lastDay = today.endOf("month").day(); // 最終日
// cosnt

// - カレンダー
//   - 月選択行
//     - 戻る
//     - 年月表示
//     - 進む
//   - 月間カレンダー（７列）
//     - 曜日行　（１行）
//     - 日付表示部分（最大６行）
// - 保存ボタン

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

function CalendarMonthSelecter() {
  return <div>{"<- Year Month ->"}</div>;
}
/**
 * データ構造はこんな感じ?
 * {日にち, 曜日} or null
 * 例)
 * {date: '2024/03/12', day: 'Tuesday'}
 * nullだったら空のセルを表示
 */
function CalendarCell({ value }: { value: string | number }) {
  return <div className="w-5 h-5 border">{value}</div>;
}

function CalendarHeader() {
  return (
    <div className="flex">
      <CalendarCell value="日" />
      <CalendarCell value="月" />
      <CalendarCell value="火" />
      <CalendarCell value="水" />
      <CalendarCell value="木" />
      <CalendarCell value="金" />
      <CalendarCell value="土" />
    </div>
  );
}

function Calendar1Week({ weekDays }: { weekDays: (string | number)[] }) {
  return (
    <div className="flex">
      {weekDays.map((day) => {
        return <CalendarCell value={day} />;
      })}
    </div>
  );
}

function Calendar() {
  const [showYearMonth, setShowYearMonth] = useState<Dayjs>();

  // ここに１週間ずつ入れる？　numberで入れていく
  const testDayList1 = ["", "", "", "", "", 1, 2];
  const testDayList2 = [3, 4, 5, 6, 7, 8, 9];
  const testDayList3 = [10, 11, 12, 13, 14, 15, 16];
  const testDayList4 = [17, 18, 19, 20, 21, 22, 23];
  const testDayList5 = [24, 25, 26, 27, 28, 29, 30];
  const testDayList6 = [31, "", "", "", "", "", ""];

  return (
    <div>
      <CalendarMonthSelecter />
      {/* 曜日を入れる*/}
      <CalendarHeader />
      <Calendar1Week weekDays={testDayList1} />
      <Calendar1Week weekDays={testDayList2} />
      <Calendar1Week weekDays={testDayList3} />
      <Calendar1Week weekDays={testDayList4} />
      <Calendar1Week weekDays={testDayList5} />
      <Calendar1Week weekDays={testDayList6} />
    </div>
  );
}

function SaveButton() {
  return <div>Save Button</div>;
}
export default function CalendarPage() {
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>();

  return (
    <div className="p-2">
      <h3>Calendar</h3>
      <Calendar />
      <SaveButton />
    </div>
  );
}
