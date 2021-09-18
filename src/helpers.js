export function convertTextToNestedObject(text){
  const fullDirectoryPaths = text.split('\n');
      const splitPaths = fullDirectoryPaths.map(p => p.split('/'));
      const fileTree = {};
      splitPaths.forEach(p => {
        let prevSection;
        let currentSection;
        for (let i = 1; i < p.length; i++) {
          currentSection = p[i];
          if (i === p.length - 1) { 
            if (currentSection.includes('.')) {
              prevSection[currentSection] = currentSection;
            } else {
              prevSection[currentSection] = {};
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

