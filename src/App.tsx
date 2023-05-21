import './App.css';
import {useState, useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';
import {SearchContainer} from './components/SearchContainer';
import {QueriesContainer} from './components/QueriesContainer'
import { SearchPageContext, reposList } from './contexts/SearchPageContext';
import {queries} from './data/queries';

function App() {
  const styles = {
    paddingBottom:"15px",
    paddingTop:"2vh",
  }
  const SearchContainerStyles = {
    height: "20vh",
    width: "40vh",
    padding: "10px", 
    marginTop: "10px",
  }
  const QueriesContainerStyles = {
    width: "40vh",
    padding: "10px",
  }
  const [isSearched, setIsSearched] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [payload, setPayload] = useState([{}]);
  const [reposList, setReposList] = useState<reposList>([]);
 
  useEffect(()=>{
  }, [isSearched])
  

  return (
    <div className="App d-flex flex-column align-items-center " style={styles}>
        <SearchPageContext.Provider value={{searchInput: {inputValue, setInputValue}, searchPayload: {payload, queries, setPayload}, searchBoolean: {isSearched, setIsSearched}, searchRepos: {reposList, setReposList}}}>
          <Row>
            <Col>
            <div className="d-flex flex-column align-items-center">
              <h1>Github Repoes</h1>
              <SearchContainer classNames={""} styles={SearchContainerStyles}/>
            </div>
            
            </Col>
            <Col>
            {isSearched ? <QueriesContainer classNames={""} styles={QueriesContainerStyles}/> : null}
            </Col>
          </Row> 
        </SearchPageContext.Provider>
    </div>
  );
}

export default App;
