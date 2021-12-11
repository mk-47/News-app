import React from 'react';
import SearchBar from './search-bar/search-box';
import { Navigate, Routes, Route, Link } from 'react-router-dom';
import { NewsSection } from './news-section/news-section';
import './App.css';


function App() {
  const [data, setData] = React.useState([]);
  const [publishers, setPublishers] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);

  React.useEffect(() => {

    // function to fetch data from api.
    const fetchData = async () => {
      const data = await fetch(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/newsf6e2440.json"
      );
      let response = await data.json();

      // sort the response using timesta
      response = response.sort((a, b) => b.TIMESTAMP - a.TIMESTAMP);
      setData(response);
      setFilteredData(response);

      // extract the publishers from API response
      const set = new Set();
      response.forEach((element) => {
        set.add(element.PUBLISHER);
      });
      // store publishers data
      setPublishers(Array.from(set));


    };
    fetchData();
  }, []);

  // search team will update the filterData state.
  const handleSearch = (searchValue) => {
    const newData = data.filter((item) => item.TITLE.toLowerCase().includes(searchValue));
    setFilteredData(newData);
  }

  // filter data for selected publishers
  const handleButtonClick = (e) => {
    const newData = data.filter((item) => item.PUBLISHER === e.target.innerText);
    setFilteredData(newData);
    <Navigate to="/" />
  }

  return (
    <div className="container">

      {/* App Heading */}
      <div className="App-header">
        <h1>News APP</h1>
      </div>

      {/* Search bar */}
      <div className="search-box">
        <SearchBar handleSearchClick={handleSearch} />
      </div>


      <div className="App">
        <div className="publishers-section">
          {publishers.map((item, i) => (
            <div key={i} className="publish-buttons">
              {/*  each button linked to path */}
              <Link to={`/${item.replaceAll(" ", "")}`}><button onClick={(e) => handleButtonClick(e)} className="btn btn-secondary" key={i}>{item}</button></Link>
            </div>
          ))}
        </div>
        <Routes>
          {/* declared routes for each publisher */}
          <Route path="/" element={<NewsSection filteredData={filteredData} />} />
          {publishers.map((item, i) => <Route path={`/${item.replaceAll(" ", "")}`} element={<NewsSection filteredData={filteredData} />} />)}
        </Routes>
      </div>
    </div>
  );
}

export default App;
