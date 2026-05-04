/**
Generic row type for the exercise dataset.
The dataset may contain different indicator columns in future versions,
so this type allows flexible key-value pairs.
*/
export type DataRow = Record<string, string | number | null>;

export type IndicatorMetadata = {
  label?: string;
  description?: string;
};



/**
* Metadata file structure.
* Indicator metadata is optional so the app can still work if a future
* metadata file is incomplete.
*/

export type Metadata = {
  indicators?: Record<string, IndicatorMetadata>;
  [key: string]: unknown;
};

/**
Normalised row shape used by the table and chart components.
*/
export type TableRow = {
  regionId: string;
  age: string;
  summaryType: string;
  values: Record<string, string | number | null>;
};