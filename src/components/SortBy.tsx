import { useSearchParams } from "react-router-dom";
import Select from "./Select";


interface SortByProps {
  options: Array<{ label: string; value: string }>;
}

function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      variant="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}



export default SortBy;
