import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { useEffect, useState } from "react";

const ChartWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ChartBox = styled.div`
  background-color: ${({ theme }) =>
    theme === "dark" ? "rgba(30, 30, 30, 0.9)" : "rgba(255, 255, 255, 0.95)"};
  border: 2px solid ${({ theme }) => (theme === "dark" ? "#444" : "#ddd")};
  border-radius: 1.6rem;
  padding: 2.4rem 3.2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

  grid-column: 3 / span 2;

  @media (max-width: 1180px) {
    padding: 2rem 1rem 2rem 1.5rem;
  }

  & > *:first-child {
    margin-bottom: 2.4rem;
    font-size: 2rem;
  }

  & .recharts-pie-label-text {
    font-weight: 500;
    fill: ${({ theme }) => (theme === "dark" ? "#ddd" : "#222")};
    font-family: "Poppins", sans-serif;
  }
`;

const startDataLight = [
  { duration: "1 night", value: 0, color: "#4a90e2" }, // blue
  { duration: "2 nights", value: 0, color: "#50e3c2" }, // teal
  { duration: "3 nights", value: 0, color: "#b8e986" }, // lime
  { duration: "4-5 nights", value: 0, color: "#f8e71c" }, // yellow
  { duration: "6-7 nights", value: 0, color: "#f5a623" }, // orange
  { duration: "8-14 nights", value: 0, color: "#d0021b" }, // red
  { duration: "15-21 nights", value: 0, color: "#9013fe" }, // purple
  { duration: "21+ nights", value: 0, color: "#8b572a" }, // brown
];

const startDataDark = [
  { duration: "1 night", value: 0, color: "#1e90ff" },
  { duration: "2 nights", value: 0, color: "#20c997" },
  { duration: "3 nights", value: 0, color: "#8bc34a" },
  { duration: "4-5 nights", value: 0, color: "#ffee58" },
  { duration: "6-7 nights", value: 0, color: "#ffb74d" },
  { duration: "8-14 nights", value: 0, color: "#ef5350" },
  { duration: "15-21 nights", value: 0, color: "#ab47bc" },
  { duration: "21+ nights", value: 0, color: "#6d4c41" },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  const [radii, setRadii] = useState({ inner: 85, outer: 110 });
  const [legendWidth, setLegendWidth] = useState(30);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 540) {
        setRadii({ inner: 40, outer: 55 });
        setLegendWidth(50);
      } else if (width < 768) {
        setRadii({ inner: 70, outer: 95 });
        setLegendWidth(45);
      } else if (width < 1000) {
        setRadii({ inner: 100, outer: 130 });
        setLegendWidth(40);
      } else if (width < 1215) {
        setRadii({ inner: 40, outer: 65 });
        setLegendWidth(40);
      } else if (width < 1400) {
        setRadii({ inner: 70, outer: 95 });
        setLegendWidth(30);
      } else {
        setRadii({ inner: 85, outer: 110 });
        setLegendWidth(30);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ChartBox theme={isDarkMode ? "dark" : "light"}>
      <Heading as="h2">Stay duration summary</Heading>

      <ChartWrapper>
        <ResponsiveContainer width="100%" aspect={2}>
          <PieChart>
            <Pie
              data={data}
              nameKey="duration"
              dataKey="value"
              innerRadius={radii.inner}
              outerRadius={radii.outer}
              cx="40%"
              cy="50%"
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width={`${legendWidth}%`}
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartBox>
  );
}

export default DurationChart;
