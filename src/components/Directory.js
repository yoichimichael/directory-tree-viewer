import { useState, useEffect } from 'react';

export default function Directory({ directory, subDirectories }){
  const [subDirs, setSubDirs] = useState(null);
  const [showSubDirs, setShowSubDirs] = useState(false);

  useEffect(() => {
    setSubDirs(subDirectories);
  }, [])

  return (
    <div className="directory">
      <div onClick={() => setShowSubDirs(prev => !prev)} className="directory-info">
        <span>{'>'}</span>
        <p className="directory-name">{directory}</p>
      </div>
      <ul className="sublist">
        {subDirs && showSubDirs ? subDirs : null}
      </ul>
    </div>
  )

}