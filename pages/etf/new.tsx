import {useState} from "react";
import { Dropdown } from "@openware/neodax-web-sdk";

type etfAsset = {
  ticker: string;
  percentage: number;
}
export default function ETFNew() {
  const [etfList, setEtfList] = useState<etfAsset[]>([{ticker: "BTC", percentage: 50}, {ticker: "ETH", percentage: 50}]);
 return (
  <div className="flex min-h-full flex-col bg-gray-100 gap-12 text-black p-8">
    <div className="flex w-full justify-between items-center">
      <span className="text-4xl font-bold">
        ETF Creation
      </span>
    </div>
    <form className="grid grid-cols-2 gap-4">
      <label>
        ETF Name
        <input type="text" className="form-input mt-1 block w-full" placeholder="ETF Name" />
      </label>
      <label>
        ETF Description
        <input type="text" className="form-input mt-1 block w-full" placeholder="ETF Description" />
      </label>
      <label>
        Assets
        {etfList.map((asset, index) => (
          <div key={index} className="flex items-center mb-4">
            <Dropdown labelClassNames="bg-red-200" list={["BTC", "ETH"]} selected={asset.ticker} onSelect={() => {
            }} />
            <input type="number" className="form-input mt-1 ml-2" placeholder="Percentage" value={asset.percentage} />
          </div>
        ))}
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Add</button>
      </label>
      <label>
        Commission
        <input type="number" className="form-input mt-1 block w-full" placeholder="Commission" />
      </label>
      <div className="col-span-2">
        <button className="mt-4 px-6 py-2 text-xs font-medium leading-6 text-white uppercase transition bg-green-500 hover:bg-green-400 rounded shadow hover:shadow-lg focus:outline-none">
          Create
        </button>
      </div>
    </form>
  </div>
)
}