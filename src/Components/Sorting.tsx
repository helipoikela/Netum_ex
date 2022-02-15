import React from "react";


type Props = {
  sortList: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Sorting: React.FC<Props> = ({sortList}) => {

  return (
    <div>
      <span> 
        <button onClick={sortList} name="firstname">Etunimi</button>      
        <button onClick={sortList} name="lastname">Sukunimi</button>
        <button onClick={sortList} name="age">Ikä</button>
      </span>
    </div>
  )
}

export default Sorting;