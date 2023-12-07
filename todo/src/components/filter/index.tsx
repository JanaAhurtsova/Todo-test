import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector, useFilterByTags } from "@/redux/hooks";
import { getExistTags } from "@/manager/tags";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Filter() {
  const todos = (useAppSelector((state) => state.todos));
  const [tags, setTags] = useState<string[]>([]);
  const [options, setOption] = useState<string[]>([]);
  const filterByTags = useFilterByTags();

  useEffect(() => {
    const existTags = getExistTags(todos);
    setOption(existTags);
    filterByTags(tags);
  }, [filterByTags, tags, todos]);

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    const tag = typeof value === 'string' ? value.split(',') : value;
    setTags(tag);
    filterByTags(tag);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={tags}
          onChange={handleChange}
          input={<OutlinedInput label="Tags" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={tags.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Filter;