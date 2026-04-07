import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Earnings = () => {
  const [data, setData] = useState([]);

  const fetch = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5000/api/earnings", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setData(res.data.breakdown);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {/* 💰 TABLE */}
      <div className="bg-white/60 backdrop-blur-xl rounded-xl p-6 shadow mb-10">
        <h2 className="text-xl mb-4">Earnings Breakdown</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500">
              <th>Product</th>
              <th>Orders</th>
              <th>Earnings</th>
            </tr>
          </thead>

          <tbody>
            {data.map((e) => (
              <tr key={e.name} className="border-t">
                <td>{e.name}</td>
                <td>{e.orders}</td>
                <td className="text-[#c8a97e]">₹{e.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📊 CHART */}
      <div className="bg-white/60 backdrop-blur-xl p-6 rounded-xl shadow">
        <h2 className="mb-4 text-xl">Earnings Chart</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="earnings" fill="#c8a97e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Earnings;
