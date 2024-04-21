import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ISelectFormation {
  selectedFormation: string;
  setSelectedFormation: (val: string) => void;
}

const SelectFormation: React.FC<ISelectFormation> = ({
  setSelectedFormation,
  selectedFormation,
}) => {
  const handleChange = (val: string) => {
    setSelectedFormation(val);
  };
  return (
    <Select onValueChange={handleChange} defaultValue="4-4-2">
      <SelectTrigger className="w-[180px] ">
        <SelectValue className="" placeholder="Select a formation" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Formations</SelectLabel>
          <SelectItem value="4-4-2">4-4-2</SelectItem>
          <SelectItem value="4-3-3">4-3-3</SelectItem>
          <SelectItem value="4-5-1">4-5-1</SelectItem>
          <SelectItem value="3-5-2">3-5-2</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default SelectFormation;
