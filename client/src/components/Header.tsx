import { FC } from 'react';

interface TitleProps {
  title: string; // try not to use any.  
};
const Header: FC<TitleProps> = ({ title }) => {
  return (
    <nav>
      <div className="nav-wrapper blue">
        <h4 className='center'> Тестовое задание. {title}</h4>
      </div>
    </nav>
  );
}

export default Header;
