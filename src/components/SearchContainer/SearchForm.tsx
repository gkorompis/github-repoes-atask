import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SearchPageContext, SearchBooleanContextInterface, InputValueContextInterface, PayloadContextInterface } from '../../contexts/SearchPageContext';

import axios from 'axios';

type SearchFormProps = {
    styles: React.CSSProperties;
    classNames: string;
};


const onSubmitHandler= async (event: React.SyntheticEvent, searchBoolean: Partial<SearchBooleanContextInterface>, searchInput:InputValueContextInterface, searchPayload: PayloadContextInterface)=>{
  event.preventDefault();
   const target = event.target as typeof event.target & {
      username: { value: string };
    };
  const username = target.username.value;
  if(username){
    // show query page by set boolean to true
    const {setIsSearched} = searchBoolean;
    setIsSearched?.(true);
    // set context variable from input value
    const {setInputValue} = searchInput;
    setInputValue?.(username);
    const {setPayload} = searchPayload;
    //get queries
    const query:any = await axios.get('https://api.github.com/users');
    const {data} = query;
    const filtered = data.filter((x: any) => x.login.includes(username));
    setPayload?.(filtered);
  } else {
    alert("username can't be empty")
  }
  
}

const onClickHandler=(event: React.SyntheticEvent, searchBoolean: Partial<SearchBooleanContextInterface>, searchInput:InputValueContextInterface, searchPayload: PayloadContextInterface)=>{
  // event.preventDefault();
  const {setIsSearched} = searchBoolean;
  const {setInputValue} = searchInput;
  const {queries, setPayload} = searchPayload;
  setIsSearched?.(false);
  setInputValue?.('');
  setPayload?.(queries);
  window.location.reload();
};

export const SearchForm=({classNames, styles}: SearchFormProps)=>{
  const SearchPage = useContext(SearchPageContext);
  const {searchBoolean, searchInput, searchPayload} = SearchPage;
  const {isSearched} = searchBoolean;
  return (
    <div>
      <Form onSubmit={(event)=>onSubmitHandler(event, searchBoolean, searchInput, searchPayload)}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Control type="text" placeholder="Enter username" name="username" />
      </Form.Group>
      <Button variant="primary" type="submit" style={{marginRight: "5px"}} >
        Search
      </Button>
      {
        isSearched ? 
        <Button variant="secondary" type="button" onClick={(event)=>onClickHandler(event, searchBoolean, searchInput, searchPayload)}>
          Back
        </Button> : null
      }
      </Form>
    </div>
  );
}

