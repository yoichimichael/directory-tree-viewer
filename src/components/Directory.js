import { useState, useEffect } from 'react';

export default function Directory({ directory, margin, subDirectories }){
  const [subDirs, setSubDirs] = useState(null);
  const [showSubDirs, setShowSubDirs] = useState(false);

  useEffect(() => {
    setSubDirs(subDirectories);
  }, [])

  return (
    <div style={margin} className="directory">
      <div onClick={() => setShowSubDirs(prev => !prev)} className="directory-info">
        <span>{showSubDirs ? 'v' : '>'}</span>
        <p className="directory-name">{directory}</p>
      </div>
      <ul className="sublist">
        {subDirs && showSubDirs ? subDirs : null}
      </ul>
    </div>
  )

}