import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useAddTags, useAppSelector } from "@/redux/hooks";
import { getExistTags } from "@/manager/tags";
import { Storage } from "@/manager/storage";

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
  const stateTags = useAppSelector((state) => state.tags);
  const addTags = useAddTags();
  const [tags, setTags] = useState<string[]>(stateTags);
  const [options, setOption] = useState<string[]>([]);

  useEffect(() => {
    const existTags = getExistTags(todos);
    setOption(existTags);
  }, [todos]);

  useEffect(() => {
    addTags(tags)
    Storage.setTags('tags', tags);
  }, [addTags, tags])

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    const tag = typeof value === 'string' ? value.split(',') : value;
    setTags(tag);
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