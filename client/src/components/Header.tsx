import { FC } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

interface TitleProps {
  title: string; // try not to use any.  
};
const Header: FC<TitleProps> = ({ title }) => {
  return (
    <AppBar position="static" component="div">
      <Toolbar>
        <Typography variant="h6" component="span">
          Тестовое задание. {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
