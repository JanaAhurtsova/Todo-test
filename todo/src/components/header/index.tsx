import { AppBar, Toolbar, Typography } from "@mui/material";
import style from './style.module.scss';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar className={style.toolbar}>
        <Typography className={style.title} variant="h5">
          Todo App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;