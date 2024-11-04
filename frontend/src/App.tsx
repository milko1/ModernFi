import { SetStateAction, useState } from 'react';
import './App.css';
import ChartYields from './ChartYields';

type SearchHistory = {
  term: string,
  year: string,
};

function App() {
  const [searching, setSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [searchTerm, setSearchTerm] = useState('Treasury Bills');
  const [searchYear, setSearchYear] = useState('');

  const handleChangeSearchTerm = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearching(false);
    setSearchTerm(event.target.value);
  };

  const handleChangeSearchYear = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearching(false);
    setSearchYear(event.target.value);
  };

  const handleSearch = () => {
    setSearching(true);
    console.log('searchTerm=', searchTerm);
    console.log('searchYear=', searchYear);
    setSearchHistory([...searchHistory, {term: searchTerm, year: searchYear}]);
  };

  return (<>
    Get Treasury Yields for:&nbsp;
    <input 
      type="text" 
      value={searchTerm} 
      onChange={handleChangeSearchTerm}
      placeholder='Treasury Bills'
    />
    &nbsp;
    <input 
      type="text" 
      value={searchYear} 
      onChange={handleChangeSearchYear}
      placeholder='Year'
    />
    <button onClick={handleSearch}>Submit</button>

    <div style={{float: 'right', fontSize: 'x-small'}}>
      Search History:<br/>
      <ul>
      {searchHistory.map((item, index) => (
        <li key={`${index}:${item.term},${item.year}`}>
          Term: {item.term}, Year: {item.year}
        </li>
      ))}
    </ul>
    </div>

    <br/>
    <br/>
    {searching && (<>
      Chart Yields:
      <ChartYields terms={searchTerm} year={searchYear} />
    </>)}
  </>);
}


export default App;
