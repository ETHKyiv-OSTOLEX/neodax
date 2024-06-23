import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Cell, Legend, Line, PieChart, Pie } from "recharts";
import { ArrowUpRight } from 'lucide-react';

function Ticker({ tickerName, shortTickerName, price, percent }: { tickerName: string, shortTickerName: string, price: number, percent: number }) {
  return (
    <div className="flex flex-col bg-white gap-4 text-black p-6 rounded-lg shadow-lg border border-gray-200 w-64">
      <div className="flex items-center justify-center bg-green-500 rounded-full w-16 h-16">
        <ArrowUpRight color="white" size={24} />
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-xl font-bold">{tickerName}</p>
        <p className="text-sm text-gray-500">{shortTickerName}</p>
      </div>
      <div className="flex gap-3 items-center">
      <p className="text-2xl font-bold">{price}$</p>
      <p className="text-green-600">+{percent}%</p>
      </div>
    </div>
  );
}

const data = [
  {
    "name": "21.06.2024",
    "pv": 700,
    "amt": 2400
  },
  {
    "name": "22.06.2024",
    "pv": 900,
    "amt": 2290
  },
  {
    "name": "23.06.2024",
    "pv": 800,
    "amt": 2000
  },
  {
    "name": "24.06.2024",
    "pv": 1200,
    "amt": 2181
  },
  {
    "name": "25.06.2024",
    "pv": 1000,
    "amt": 2500
  },
  {
    "name": "26.06.2024",
    "pv": 1400,
    "amt": 2100
  }
]

const data01 = [
  { name: 'ETH', value: 40 },
  { name: 'BTC', value: 30 },
  { name: 'YELLOW', value: 20 },
  { name: 'DUCKIES', value: 10 },
];

const COLORS = ['#716B94', '#F7931A', '#FFBB28', '#FF8042'];

export default function ETFStats() {
  return (
    <div className="flex min-h-full flex-col bg-gray-100 gap-12 text-black p-8">
      <div className="flex flex-col gap-2">
        <span className="text-4xl font-bold">
          Serj ETF
        </span>
        <p className="text-xl text-gray-600 font-bold">The best ETF in crypto rn!</p>
      </div>
      <div className="w-full sm:flex justify-center overflow-x-auto">
        <LineChart width={1000} height={250} data={data}
                   margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip wrapperStyle={{ backgroundColor: "#f0f0f0" }} />
          <Line type="monotone" dataKey="pv" stroke="#82ca9d" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
        </LineChart>
      </div>
      <div className="flex gap-4 w-full items-center justify-between">
        <PieChart width={530} height={350}>
          <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={125} fill="#8884d8" label>
            {
              data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        <div className="flex w-1/2 justify-center">
        <div className="grid grid-cols-2 gap-3">
          <Ticker tickerName="Ethereum" shortTickerName="ETH" price={42} percent={13} />
          <Ticker tickerName="Bitcoin" shortTickerName="BTC" price={37} percent={17} />
          <Ticker tickerName="Yellow" shortTickerName="YELLOW" price={21} percent={10} />
          <Ticker tickerName="Duckies" shortTickerName="DUCKIES" price={8} percent={12} />
        </div>
        </div>
      </div>
      <div className="flex gap-4 self-center">
        <button
          className="mt-4 inline-block px-6 py-2 text-xs font-medium leading-6 text-white uppercase transition bg-green-500 hover:bg-green-400 rounded shadow hover:shadow-lg focus:outline-none"
        >
          Buy
        </button>
        <button
          className="mt-4 inline-block px-6 py-2 text-xs font-medium leading-6 text-white uppercase transition bg-red-500 hover:bg-red-400 rounded shadow hover:shadow-lg focus:outline-none"
        >
          Sell
        </button>
      </div>
    </div>
  )
}
