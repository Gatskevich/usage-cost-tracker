"use client";

import { random } from "lodash";

interface FilterProps {
  types: string[];
  models: string[];
  selectedType: string;
  selectedModel: string;
  onTypeChange: (type: string) => void;
  onModelChange: (model: string) => void;
}

const Filter = ({ types, models, selectedType, selectedModel, onTypeChange, onModelChange }: FilterProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Type:
        </label>
        <select
          key={"Alltypes"}
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All</option>
          {types.map((type) => (
            <option key={type + random(0, 1000) * 12} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Model:
        </label>
        <select
          value={selectedModel}
          onChange={(e) => onModelChange(e.target.value)}
          className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All</option>
          {models.map((model) => (
            <option key={model + random(0, 1000) * 12} value={model}>{model}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
