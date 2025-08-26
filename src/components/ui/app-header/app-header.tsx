import React, { FC } from 'react';
import styles from './app-header.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <div
            onClick={() => handleNavigate('/')}
            className={`${styles.link} ${location.pathname === '/' ? styles.link_active : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <BurgerIcon
              type={location.pathname === '/' ? 'primary' : 'secondary'}
            />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </div>
          <div
            onClick={() => handleNavigate('/feed')}
            className={`${styles.link} ${location.pathname === '/feed' ? styles.link_active : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <ListIcon
              type={location.pathname === '/feed' ? 'primary' : 'secondary'}
            />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </div>
        </div>

        <div className={styles.logo} onClick={() => handleNavigate('/')}>
          <Logo className='' />
        </div>
        <div
          className={styles.link_position_last}
          onClick={() => handleNavigate('/profile')}
        >
          <div
            className={`${styles.link} ${location.pathname.startsWith('/profile') ? styles.link_active : ''}`}
          >
            <ProfileIcon
              type={
                location.pathname.startsWith('/profile')
                  ? 'primary'
                  : 'secondary'
              }
            />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
};
