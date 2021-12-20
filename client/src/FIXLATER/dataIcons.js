import React from 'react';
import {
  FaBehance,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaSketch,
  FaHome,
  FaUserFriends,
  FaFolderOpen,
  FaCalendarAlt,
  FaWpforms,
  FaFeatherAlt
} from 'react-icons/fa';

import {AiOutlineHome} from 'react-icons/ai'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SingleProfile from './pages/SingleProfile'


export const links = [
  {
    
    id: 1,
    url: '/',
    text: 'Home',
    icon: <AiOutlineHome />,
  },
  {
    id: 2,
    url: <Route path={'/profile/:id'} component={SingleProfile}/>,
    text: 'Profile',
    icon: <FaUserFriends />,
  },
  
  
  
];

export const social = [
  {
    id: 1,
    url: 'https://www.twitter.com',
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: 'https://www.twitter.com',
    icon: <FaLinkedin />,
  },
  {
    id: 4,
    url: 'https://www.twitter.com',
    icon: <FaBehance />,
  },
  {
    id: 5,
    url: 'https://www.twitter.com',
    icon: <FaSketch />,
  },
];
