import { useContext , useEffect} from 'react';
import { ReposContextInterface, SearchPageContext } from '../../contexts/SearchPageContext';
import {Accordion, Card} from 'react-bootstrap';
import axios from 'axios';


type AccordionCardProps = {
  cardTitle: string
};

const accordionHeadHandler = async(event:React.SyntheticEvent, username:string, id:number, searchRepos:ReposContextInterface) =>{
  const repos = await axios.get(`https://api.github.com/users/${username}/repos`);
  const {data} = repos;
  const {setReposList} = searchRepos;
  setReposList?.(data);
};

const AccordionCard = ({cardTitle}:AccordionCardProps) =>{
  return(
      <Card style={{ width: '30vh', marginBottom: "5px" }}>
      <Card.Body>
        <Card.Title style={{fontSize: "15px"}}>{cardTitle}</Card.Title>
        <Card.Text style={{fontSize: "13px"}}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  )
}


const QueriesAccordion=()=>{
const SearchPage = useContext(SearchPageContext);
const {searchPayload, searchInput, searchRepos} = SearchPage;
const {reposList} = searchRepos;
const {payload} = searchPayload;
const {inputValue} = searchInput;

useEffect(()=>{
},[payload, reposList]);
  return (
    <Accordion>
      {payload.length > 0 ? 
        <div>
          <p>Found {payload.length} users for "{inputValue}"...</p>
          <div className="overflow-auto" style={{height:"70vh"}}>
            {payload ? payload.map((x:any, id) => 
           (<Accordion.Item key={id} eventKey={`${id}`}>
            <Accordion.Header onClick={(event)=>accordionHeadHandler(event, x.login, id, searchRepos)}>{x.login}</Accordion.Header>
            <Accordion.Body style={{height: "40vh", overflow: "scroll"}}>
             
                {reposList ? reposList.map((y:any, id)=>{
                return <AccordionCard cardTitle= {y.name} key={id}/>
              }) as any : <h1>loading...</h1>}
             
              
            </Accordion.Body>
          </Accordion.Item>)
          ): <p>loading...</p>}
          </div>
          
        </div>
     :
      (<p>found no results for user "{inputValue}"</p>)
      }
    </Accordion>
  );
};

export default QueriesAccordion;
