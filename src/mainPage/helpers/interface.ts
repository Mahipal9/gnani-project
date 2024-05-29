
export interface TableColumn {
  header: string;
  type?: string;
}

export interface TableWrapperProps {
  tableColumns: TableColumn[];
  data: Dog[] | undefined;
  isLoading: boolean;
  handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  page: number;
  rowsPerPage: number;
}

export interface Dog {
  id: string;
  name: string;
  height: string;
  width: string;
  image: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
}

export interface DogItem {
  id: string;
  breeds: {
    name?: string;
    height?: { imperial?: string };
    weight?: { imperial?: string };
    bred_for?: string;
    breed_group?: string;
    life_span?: string;
    temperament?: string;
  }[];
  url: string;
}

export interface SearchOption {
  label: string;
  value: string;
 
}

export interface SearchBarProps {
  searchType: string;
  setSearchType: (type: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchOptions:SearchOption[];
}


