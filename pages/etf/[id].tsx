import { TickerCard } from "@openware/neodax-web-sdk";
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Cell, Legend, Line, PieChart, Pie } from "recharts";

function Ticker() {
  return (
    <TickerCard market={{
      "id": "duckiesusd",
      "name": "DUCKIES/USD",
      "type": "spot",
      "base_unit": "duckies",
      "quote_unit": "usd",
      "amount_precision": 8,
      "price_precision": 8
    }} tickers={{
      "duckiesusd": {
        "name": "duckiesusd",
        "at": 1718102593,
        "min": "0.6057875601785985",
        "max": "0.6437027104065439",
        "open": "0.6437027104065439",
        "last": "0.6265928885152772",
        "volume": "78606193.43999986",
        "amount": "48947855.082822464",
        "vwap": "0.6226971812365444",
        "price_change_percent": "2.6495943105654054"
      }
    }} handleDragEnter={() => {}} handleDragEnd={() => {}} handleDrag={() => {}} />
  )
}

const data = [
  {
    "name": "Page A",
    "pv": 700,
    "amt": 2400
  },
  {
    "name": "Page C",
    "pv": 900,
    "amt": 2290
  },
  {
    "name": "Page D",
    "pv": 800,
    "amt": 2000
  },
  {
    "name": "Page E",
    "pv": 1200,
    "amt": 2181
  },
  {
    "name": "Page F",
    "pv": 1000,
    "amt": 2500
  },
  {
    "name": "Page G",
    "pv": 1400,
    "amt": 2100
  }
]

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ETFStats() {
  return (
    <div className="flex min-h-full flex-col bg-gray-100 gap-8 text-black p-8">
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
      <div className="flex gap-4 w-full justify-between">
        <PieChart width={730} height={250}>
          <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {
              data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        <div className="flex w-1/2 gap-3 flex-col">
          <Ticker />
          <Ticker />
          <Ticker />
          <Ticker />
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
