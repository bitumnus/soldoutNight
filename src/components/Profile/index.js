import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from '../axios/api';
import Avatar from '../Avatar'
import styled from 'styled-components';
import linkify from 'util'
import LocationIcon from './location.svg';
import CompanyIcon from './organization.svg';
import LinkIcon from './link.svg';

const Styles = styled.div `
  user: {
    color: 'inherit',
  },

  user_wrapAvatar: {
    marginRight: 15,
  },

  user_username: {
    fontSize: 20,
  },
  userInfo_item: {
    marginBottom: 6,
  },

  userInfo_text: {
    fontSize: 14,
  },

  userInfo_icon: {
    marginRight: 7,
  },
`

function renderIcon(Icon) {
  return (
    <Icon
      className="userInfo_icon"
      width={18}
      height={18}
    />
  );
}

function renderLocation(text) {
  if (!text) {return null;}
  return (
    <li className={`userInfo_item u-flex u-flexAlignItemsCenter`}>
      {renderIcon(LocationIcon)}
      <p className="userInfo_text">{text}</p>
    </li>
  );
}

function renderLink(link) {
  if (!link) {return null;}
  return (
    <li className={`serInfo_item u-flex u-flexAlignItemsCenter`}>
      {renderIcon(LinkIcon)}
      <p className="userInfo_text">
        <a href={link}>{link}</a>
      </p>
    </li>
  );
}

function renderCompany(text) {
  if (!text) {return null;}
  return (
    <li className={`userInfo_item u-flex u-flexAlignItemsCenter`}>
      {renderIcon(CompanyIcon)}
      <p
        className="userInfo_text"
        dangerouslySetInnerHTML={{__html: linkify(text)}}
      />
    </li>
  );
}

function Profile(props) {

    const [user, setUser] = useState(props.match.params.user);
    const [avatar, setAvatar] = useState('');
    const [id, setId] = useState('');
    const [company, setCompany] = useState('');
    const [blog, setBlog] = useState('');
    const [location, setLocation] = useState('')

    useEffect(() => {
        (async () => {
          const res = await axios.get(`/users/${user}`);
          console.log('res~', res);
          
          setAvatar(res.data.avatar_url);
          setId(res.data.id);
        })();
      });
    return (
      <Styles>
        <div>
          <div className="user_wrapAvatar">
            <Avatar
              url={avatar}
              name={user}
              width={90}
            />
          </div>
          <p> id: {id} </p>
          <p className="user_username">login: {user}</p>
          <ul>
            {renderCompany(company)}
            {renderLocation(location)}
            {renderLink(blog)}
          </ul>
        </div>
      </Styles>
    )
}

export default withRouter(Profile);