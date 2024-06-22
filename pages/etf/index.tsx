import Link from 'next/link';
import { Dropdown, SearchBar } from "@openware/neodax-web-sdk";
import {TrendingUp} from "lucide-react";

function ETFCard({name, amount, growthPercentage}: {name: string, amount: number, growthPercentage: number}) {
  return (
    <div className="flex flex-col bg-white text-black p-6 rounded-lg shadow-lg border border-gray-200">
      <p className="text-2xl font-bold">{name}</p>
      <div className="flex justify-between mt-4">
        <p className="text-xl font-semibold">{amount} $</p>
        <span className="flex gap-1.5 items-center text-green-600">
          <TrendingUp size={24} />
        <p className="text-green-600 text-xl font-semibold">{growthPercentage}%</p>
        </span>
      </div>
      <div className="flex justify-between mt-4">
        <p className="text-gray-500 mt-2">5 p.</p>
        <Link href={`/etf/${name}`}
              className="mt-4 inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-black uppercase transition hover:bg-yellow-400 rounded hover:shadow focus:outline-none"
        >
            View Details
        </Link>
      </div>
    </div>
  );
}


export default function ETFHome() {
  return (
    <div className="flex min-h-full flex-col bg-gray-100 gap-12 text-black p-8">
      <div className="flex w-full justify-between items-center">
        <span className="text-4xl font-bold">
          ETF Home
        </span>
        <div className="flex gap-2">
          <SearchBar placeholder="Find an ETF to buy" />
          <Dropdown labelClassNames="bg-red-200"  list={["BTC","ETH"]}  selected={"ETH"} onSelect={() => {}} />
        </div>
      </div>
      <div className="flex gap-4 md:gap-12">
        <p className="text-6xl md:text-8xl font-bold">100 $</p>
        <span className="flex gap-3 items-center text-green-600">
          <TrendingUp size={64} />
          <p className="text-4xl md:text-6xl">8%</p>
        </span>
      </div>
      <div className="flex flex-col">
        <p className="text-2xl font-semibold mb-4">8 ETFs</p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <ETFCard name={"Serj ETF"} amount={100} growthPercentage={5} />
          <ETFCard name={"Serj ETF"} amount={100} growthPercentage={5} />
          <ETFCard name={"Cy ETF"} amount={10} growthPercentage={3} />
          <ETFCard name={"Serj ETF"} amount={100} growthPercentage={5} />
          <ETFCard name={"Serj ETF"} amount={100} growthPercentage={5} />
        </div>
      </div>
    </div>
  )
}
