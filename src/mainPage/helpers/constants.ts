import { SearchOption, TableColumn } from "./interface";

export let tableColumns: TableColumn[] = [
  {
    header: "id",
  },
  { header: "name" },
  { header: "image", type: "avatar" },
  { header: "height" },
  { header: "width" },
  { header: "bred_for" },
  { header: "breed_group" },
  { header: "life_span" },
  { header: "temperament" },
];

export const searchOptions: SearchOption[] = [
  { label: "Dog Id", value: "dog_id" },
  { label: "Dog Name", value: "dog_name" },
];
