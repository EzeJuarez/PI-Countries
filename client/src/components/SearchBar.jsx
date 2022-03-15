import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountry } from '../redux/actions';

export default function SearchBar() {
    const [ search, setSearch ] = useState("");
    const dispatch = useDispatch();
    
    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchCountry(search));
        setSearch("");
    };
    function onChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Buscar" onChange={onChange} value={search} />
                <input type="submit" value="Buscar" />
            </form>
        </div>
    );
};
