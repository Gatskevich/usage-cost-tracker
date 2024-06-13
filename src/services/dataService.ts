import { parse } from 'papaparse';
import { Usage } from 'src/interfaces/Usage';
import { Cost } from 'src/interfaces/Cost';

export async function readData() {
  try {
    const usagesResponse = await fetch('/usages.csv');
    const costsResponse = await fetch('/costs.csv');

    if (!usagesResponse.ok || !costsResponse.ok) {
      throw new Error('Failed to fetch CSV files');
    }

    const usagesFile = await usagesResponse.text();
    const costsFile = await costsResponse.text();

    const usagesData = parse<Usage>(usagesFile, { header: true }).data;
    const costsData = parse<Cost>(costsFile, { header: true }).data;

    return { usages: usagesData, costs: costsData };
  } catch (error) {
    console.error('Error reading or parsing CSV files:', error);
    throw error;
  }
}
