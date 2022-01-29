import { FC } from 'react';

interface TitleProps {
  title: string; // try not to use any.  
};
const Header: FC<TitleProps> = ({ title }) => {
  console.log(title);
  return (
    <nav>
      <div className="nav-wrapper blue">
        <a href="#" className="brand-logo center"> Тестовое задание. {title}</a>
      </div>
    </nav>
  );
}

export default Header;
