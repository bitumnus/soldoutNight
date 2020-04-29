import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import Button from '../UI/Button/Button';

const SearchContainer = () => {

    const [searchType, setSearchType] = useState('users');
    const [searchValue, setSearchValue] = useState('');
    
    return (
        <div>
            <form>
                <select name="select" onChange={event => setSearchType(event.target.value)}>
                    <option defaultValue value="users">User Name</option> 
                    <option value="repositories">Repos Name</option>
                </select>
                <input
                    type="text"
                    onChange={event => setSearchValue(event.target.value)}
                />
                <NavLink to={{
                    pathname: '/search',
                    search: `type=${searchType}&value=${searchValue}`,
                }}>
                    <Button type="primary" >Get User</Button>
                </NavLink>
            </form>
        </div>
    )
}

export default SearchContainer;
