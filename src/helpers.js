export function convertTextToFileTree(text){
  const fullDirectoryPaths = text.split('\n');
  const splitPaths = fullDirectoryPaths.map(p => p.split('/'));
  const fileTree = {};
  splitPaths.forEach((p, i) => {
    let prevSection;
    let currentSection;
    for (let i = 1; i < p.length; i++) {
      currentSection = p[i];
      if (i === p.length - 1) {
        if (currentSection.includes('.')) {
          if (prevSection) prevSection[currentSection] = currentSection;
          else fileTree[currentSection] = currentSection;
        } else {
          if (prevSection) prevSection[currentSection] = {};
          else fileTree[currentSection] = {};
        }
      } else {
        if (prevSection) {
          if (prevSection[currentSection]) {
            prevSection = prevSection[currentSection];
            continue;
          } else {
            prevSection[currentSection] = {};
            prevSection = prevSection[currentSection];
          }
        } else {
          if (fileTree[currentSection]) {
            prevSection = fileTree[currentSection];
            continue;
          } else {
            fileTree[currentSection] = {};
            prevSection = fileTree[currentSection];
          }
        }
      }
    }
  });
  return fileTree;
}

/* 



*/

export function convertFileTreeToHtml(fileTree, Component){
  const directories = Object.keys(fileTree);
  return directories.map((directory, i) => {
    return (
      directory.includes('.') 
      ? <li key={i} className="filename">{directory}</li> 
      : <Component key={i} directory={directory} subDirectories={convertFileTreeToHtml(fileTree[directory], Component)}/>
    );
  })
}

