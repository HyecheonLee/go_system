import {useState} from 'react';

export const useNavDropMenu = props => {
  const [navDropMenuPosX, setNavDropMenuPosX] = useState(-320);
  const [navDropMenuType, setNavDropMenuType] = useState('');
  return {
    navDropMenuPosX,
    setNavDropMenuPosX,
    navDropMenuType,
    setNavDropMenuType
  };
};

