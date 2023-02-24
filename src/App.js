import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Importing Other Components
import FormatDate from './FormatDate';
import Topbar from './Topbar';

// Importing Bootstrap Components
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';

// Import Images
import ForkImg from './fork.png';
import StarImg from './star.png';

const App = () => {

  const [repos, setRepos] = useState([]);
  const [username, setUsername] = useState(null);
  const [m, setM] = useState(null);
  const [n, setN] = useState(null);
  
  const [tempUsername, setTempusername] = useState(null);
  const [tempN, setTempN] = useState(10);
  const [tempM, setTempM] = useState(5);

  // For Fetching the Repos 
  useEffect(() => {
    const fetchRepos = async () => {

      let resData = [];
      let lastPageNumber = Math.ceil(n/100);

      for(let i=1; i<=lastPageNumber; i++){
         const response = await axios.get(`
            https://api.github.com/search/repositories`,
            {
              params :  {
                  q : `user:${username}`,
                  sort : 'forks',
                  page : i,
                  per_page : i==lastPageNumber && n%100!=0 ? n%100 : 100,
              }
            }
        );
        resData = [...resData, ...response.data.items]
      }
      setRepos(resData);
    };
    if(username!=null && m!=null && n!=null){
      fetchRepos();
    } else {
      setRepos(null);      
    }
  }, [username,m,n]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setN(tempN);
    setM(tempM);
    setUsername(tempUsername); 
  }

  // For Fetching the Forkers List
  const [forkers, setForkers] = useState([]);
  const [repoName, setRepoName] = useState(null);

  useEffect(() => {
    const fetchForkers = async () => {
      const response = await axios.get(`
          https://api.github.com/repos/${username}/${repoName}/forks`,
          {
            params : {
              sort : 'oldest',
            }
          });
      setForkers(response.data);
    };
    if(repoName!=null && m!=null){
      fetchForkers();
    } else {
      setForkers(null);
    }
  }, [repoName,m]);


  // Functions & state for the modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
      setRepoName(null);  
      setShow(false);
  }
  const handleShow = () => setShow(true);  

  return (
    <>
 
    <Topbar/>
    <br/>

    {/* Form Code */}

    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Label><b>Fill the following as :</b> Organization name, N (Top Repos) & M (Oldest Forks)</Form.Label>
        <InputGroup className="mb-3">
            <Form.Control 
                value={tempUsername} 
                onChange={e => setTempusername(e.target.value)} 
                placeholder="Organization"
            />
            <Form.Control 
                value={tempN}
                onChange={e => setTempN(e.target.value)}
                type="number" 
                aria-label="n" 
                placeholder="N (Top Repos)"
            />
            <Form.Control 
                value={tempM} 
                onChange={e => setTempM(e.target.value)} 
                type="number" 
                aria-label="m" 
                placeholder="M (Oldest Forks)"
            />
            <Button 
                variant="primary" 
                id="button-addon2" 
                type="submit" 
                onClick={handleSubmit}
            >
               Fetch Data
            </Button>
        </InputGroup>
        <Form.Text className="text-muted">
          The maximum value of m and n you can use is 30 & 1000 respectively.
        </Form.Text>
      </Form>
    </div>
    <br/>

    {/* Table Code */}

    {repos && <Container>
      <Table striped variant="light">
        <thead>
          <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Forks</th>
              <th>Stars</th>
              <th>Forkers List</th>
          </tr>
        </thead>
        <tbody>
        {repos && repos.map((repo, index) => (
          <tr key={repo.id*Math.random()}>
            <td>{index+1}</td>
            <td><a href={repo.svn_url}>{repo.name}</a></td>
            <td><img src={ForkImg} alt="forkImg"/> {repo.forks}</td>
            <td><img src={StarImg} alt="starImg"/> {repo.stargazers_count}</td>
            <td>
                  <Button variant="outline-primary" onClick={() => { 
                      handleShow();
                      setRepoName(repo.name);  
                  }}>
                      Check Forkers List
                  </Button>
            </td>
          </tr>
          ))}
        </tbody>
        </Table>
      </Container>
    }

    {/* Modal Code */}

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forkers List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ListGroup as="ol" numbered>
              {forkers && forkers.slice(0,m>30 ? 30 : m).map((forker) => (
                <ListGroup.Item key={forker.id*Math.random()} as="li" className="d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">
                        <Image roundedCircle src={forker.owner.avatar_url} style={{width:'8%'}}/>
                        <span> </span>
                        <a href={forker.owner.html_url}>{forker.owner.login}</a>
                    </div>
                  </div>
                  <Badge bg="primary" pill>
                    <FormatDate date={forker.created_at}/>
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
    </Modal>

    </>
  );
};

export default App;
