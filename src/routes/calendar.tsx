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
function CalendarDay({ day }: { day: Dayjs }) {
  return <div>{day.format("D")}</div>;
}

function Calendar1Week({ weekDays }: { weekDays: Dayjs[] }) {
  return (
    <div>
      {weekDays.map((day) => {
        <CalendarDay day={day} />;
      })}
    </div>
  );
}

function Calendar() {
  const [showYearMonth, setShowYearMonth] = useState<Dayjs>();

  const testDayList = [dayjs(), dayjs()];

  return (
    <div>
      <CalendarMonthSelecter />
      <Calendar1Week weekDays={testDayList} />
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
