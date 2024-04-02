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
// cosnt weekdayNum = today.day(); // 曜日のnumberを取得(0が日曜日、6が土曜日)

// - カレンダー
//   - 月選択行
//     - 戻る
//     - 年月表示
//     - 進む
//   - 月間カレンダー（７列）
//     - 曜日行（１行）
//     - 日付表示部分（最大６行）
// - 保存ボタン

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

function CalendarMonthSelecter({
  date,
  onClickNext,
  onClickPrev,
}: {
  date: Dayjs;
  onClickPrev: () => void;
  onClickNext: () => void;
}) {
  return (
    <div className="flex">
      <div onClick={onClickPrev}>{"<"}</div>
      <div>{date.format("YYYY/MM")}</div>
      <div onClick={onClickNext}>{">"}</div>
    </div>
  );
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
  const [showYearMonth, setShowYearMonth] = useState<{
    year: number;
    month: number;
  }>({ year: dayjs().year(), month: dayjs().month() - 1 });

  const date = dayjs()
    .year(showYearMonth.year)
    .month(showYearMonth.month - 1);

  const day = date.date(1).day();

  const daysInMonth = date.daysInMonth();

  const japaneseDay = ["日", "月", "火", "水", "木", "金", "土"][day];
  // alert(japaneseDay)

  // ここに１週間ずつ入れる？ numberで入れていく
  const monthArray: (string | number)[] = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  for (let i = 0; i < day; i += 1) {
    monthArray.unshift("");
  }

  const week = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div>
      <CalendarMonthSelecter
        date={date}
        onClickPrev={() =>
          setShowYearMonth({ year: 2024, month: showYearMonth.month - 1 })
        }
        onClickNext={() =>
          setShowYearMonth({ year: 2024, month: showYearMonth.month + 1 })
        }
      />

      {/* 曜日を入れる*/}
      <CalendarHeader />
      <Calendar1Week weekDays={week.map((v) => monthArray[v])} />
      <Calendar1Week weekDays={week.map((v) => monthArray[v + 7])} />
      <Calendar1Week weekDays={week.map((v) => monthArray[v + 14])} />
      <Calendar1Week weekDays={week.map((v) => monthArray[v + 21])} />
      <Calendar1Week weekDays={week.map((v) => monthArray[v + 28])} />
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
