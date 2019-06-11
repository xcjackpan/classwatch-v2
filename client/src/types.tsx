export interface IParsedResults {
  section: string;
  reserve: string;
  reserve_enrol_cap: number;
  reserve_enrol_total: number;
  instructor: string;
  time: string;
  days: string;
  date: string;
}

export interface IResultsProps {
  changeTerm: (term: string) => void;
  help: () => void;
  history?: any;
  location?: any;
  match?: any;
  search: (searchString: string) => void;
}

export interface ISearchProps {
  terms: string[];
  changeTerm(term: string): void;
  search(searchString: string): void;
}
