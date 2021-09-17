import './App.css';
import { useEffect, useState } from 'react';
import raw from './dummyText.txt';

/*
 import the file => import raw change the raw into to text to be string
 
data structure
 - each node will be a path section
 

 /buildroot/configs/pandaboard_defconfig

                parent
                [buildroot, ...]

        buildroot
        [configs,...]
      
    configs
    [pandaboard_defconfig, ...]

['', 'buildroot', 'configs', 'qmx6_defconfig']
['', 'buildroot', 'configs', 'qemu_microblazeel_mmu_defconfig']
['', 'buildroot', 'configs', 'atstk100x_defconfig']
['', 'buildroot', 'configs', 'altera_sockit_defconfig']
['', 'buildroot', 'configs', 'calao_usb_a9260_defconfig']
['', 'buildroot', 'configs', 'at91sam9260eknf_defconfig']
['', 'buildroot', 'configs', 'qemu_ppc_mpc8544ds_defconfig']


*/


function App() {
  const [fileTree, setFileTree] = useState({});

  useEffect(() => {
    fetch(raw)
    .then(r => r.text())
    .then(text => {
      const fullDirectoryPaths = text.split('\n');
      const splitPaths = fullDirectoryPaths.map(p => p.split('/'));
      const newData = {};
      splitPaths.forEach(p => {

        // ['', 'buildroot', 'configs', 'at91sam9261ek_defconfig']
        let prevSection;
        let currentSection;
        for (let i = 1; i < p.length; i++) {
          currentSection = p[i];
          if (i === p.length - 1) { // for last section
            
            if (currentSection.includes('.')) { // is file
              prevSection[currentSection] = currentSection;
            } else {
              prevSection[currentSection] = {};
            }
          }
          
          if (prevSection) { // in subdirectory
            if (prevSection[currentSection]) {
              prevSection = prevSection[currentSection];
              continue;
            } else { // directory doesn't exist
              prevSection[currentSection] = {};
              prevSection = prevSection[currentSection];
            }
          } else { // in parent
            if (newData[currentSection]) {
              prevSection = newData[currentSection];
              continue;
            } else { // directory doesn't exist
              newData[currentSection] = {};
              prevSection = newData[currentSection];
            }
          }
          // directory already exists
          
        }
      });
      
      console.log({newData});
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {/* {data.length ? data.map((p, i) => <li key={i
          }>{p}</li>) : null} */}
        </ul>
      </header>
    </div>
  );
}

export default App;


