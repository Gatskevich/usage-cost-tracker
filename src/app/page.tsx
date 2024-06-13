"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Filter from "src/components/Filter";
import UsageCostChart from "src/components/UsageCostChart";
import { Cost } from "src/interfaces/Cost";
import { Usage } from "src/interfaces/Usage";
import { readData } from "src/services/dataService";

export default function Index() {
  const [usages, setUsages] = useState<Usage[]>([]);
  const [costs, setCosts] = useState<Cost[]>([]);
  const [typeUsage, setTypeUsage] = useState('');
  const [model, setModel] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const uniqueTypes = useMemo(() => Array.from(new Set(usages.map(usage => usage.type))), [usages]);
  const uniqueModels = useMemo(() => Array.from(new Set(usages.map(usage => usage.model))), [usages]);
  const filteredUsages = useMemo(() => {
    return usages.filter((usage) => 
      (typeUsage ? usage.type === typeUsage : true) && 
      (model ? usage.model === model : true)
    );
  }, [usages, typeUsage, model]);

  const fetchData = useCallback(async () => {
    try {
      const { usages, costs } = await readData();
      setUsages(usages);
      setCosts(costs);
      setLoading(false);
    } catch (err) {
      setError("Failed to load data");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Filter 
        types={uniqueTypes} 
        models={uniqueModels} 
        selectedType={typeUsage} 
        selectedModel={model} 
        onTypeChange={setTypeUsage} 
        onModelChange={setModel} 
      />
      <UsageCostChart usages={filteredUsages} costs={costs} />
    </div>
  );
}
