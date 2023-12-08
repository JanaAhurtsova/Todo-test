import { Chip, Stack } from "@mui/material";
import {v4 as uuidv4 } from 'uuid';
import { TagsType } from "./type";
import style from './style.module.scss';

function Tags({ tags }: TagsType) {
  return (
    <Stack direction="row" spacing={1}>
      {tags.map((tag) => (
        <Chip
          key={uuidv4()}
          label={tag}
          color="success"
          variant="outlined"
          className={style.tag}
        />
      ))}
    </Stack>
  );
}

export default Tags;