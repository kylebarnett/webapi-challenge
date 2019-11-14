import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import Description from './Description';

function App(props) {
  const [info, setInfo] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/projects')
      .then(res => setInfo(res.data))
  }, [])
  return (
    <div className="App">
      <Route exact path="/:id/description" render={props => <Description {...props} info={info} />} />
      {info.map(project => (
        <div key={project.id}>
          <li>
            {project.name}
          </li>
          <Link to={`${project.id}/description`}>Description</Link>
        </div>
      ))}
    </div>
  );
}

export default App;
