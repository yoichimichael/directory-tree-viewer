import './App.css';
import { useEffect, useState } from 'react';
import { convertTextToFileTree, convertFileTreeToHtml } from './helpers';
import Directory from './components/Directory';
import raw from './data.txt';

function App() {
  const [fileTree, setFileTree] = useState({});

  useEffect(() => {
    fetch(raw)
    .then(r => r.text())
    .then(text => {
      const fileTree = convertTextToFileTree(text);
      setFileTree(fileTree);
    });
  }, []);



  return (
    <div className="App">
      {convertFileTreeToHtml(fileTree, 0, Directory)}
    </div>
  );
}

export default App;


