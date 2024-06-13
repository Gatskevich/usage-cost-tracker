"use client";

import { useEffect, useCallback, useMemo, useReducer } from "react";
import Filter from "src/components/Filter";
import UsageCostChart from "src/components/UsageCostChart";
import { readData } from "src/services/dataService";
import { initialState, reducer } from "src/services/reducerService";

export default function Index() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { usages, costs, typeUsage, model, loading, error} = state;

  const uniqueTypes = useMemo(() => Array.from(new Set(usages.map(usage => usage.type))), [usages]);
  const uniqueModels = useMemo(() => Array.from(new Set(usages.map(usage => usage.model))), [usages]);
  const filteredUsages = useMemo(() => {
    return usages.filter((usage) => 
      (typeUsage ? usage.type === typeUsage : true) && 
      (model ? usage.model === model : true)
    );
  }, [usages, typeUsage, model]);

  const fetchData = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { usages, costs } = await readData();
      dispatch({ type: 'SET_DATA', payload: { usages, costs } });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: "Failed to load data" });
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
        onTypeChange={(type) => dispatch({ type: 'SET_TYPE_USAGE', payload: type })} 
        onModelChange={(model) => dispatch({ type: 'SET_MODEL', payload: model })} 
      />
      <UsageCostChart usages={filteredUsages} costs={costs} />
    </div>
  );
}
