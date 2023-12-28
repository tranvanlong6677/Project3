import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
const Index = () => {
  const data = {
    labels: ["Part 1", "Part 2", "Part 3"],
    datasets: [
      {
        data: [50, 30, 20], // Phần trăm tương ứng của từng phần
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Màu sắc tương ứng của từng phần
      },
    ],
  };

  // Tùy chọn của biểu đồ
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default Index;
