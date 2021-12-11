import React from 'react';


const SearchBar = (props) => {
    const [searchValue, setSearchValue] = React.useState('');
    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    } 
    
    const handleSearchClick = (e) => {
        // e.stopPropagation();
        e.preventDefault();
        props.handleSearchClick(searchValue);
    }

    return (
        <div className="d-flex search-bar-width justify-content-end">
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" onChange={handleSearch} aria-label="Search" value={searchValue} />
                <button className="btn btn-outline-success" type="submit" onClick={handleSearchClick}>Search</button>
            </form>
        </div>
    )
}

export default SearchBar;