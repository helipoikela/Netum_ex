import React from "react";

// Määritellää rajapinta PersonInfo-tyypille
interface PersonInfo {
  firstname: string;
  lastname: string;
  age: string;
  id: number;
}

type Props = {
  personInfo: PersonInfo[];
  deletePerson: (event: React.MouseEvent<HTMLButtonElement>) => void;
  openPopup: (event: React.MouseEvent<HTMLButtonElement>) => void;
  order: number[];
  setOrder: React.Dispatch<React.SetStateAction<number[]>>
};

let list: PersonInfo[];

const Table: React.FC<Props> = ({personInfo, deletePerson, openPopup, order, setOrder}) => {
  
  if (order.length > 0) {
    order.forEach(id => {
      let item = personInfo.find(i => i.id == id)
      list.concat(item as PersonInfo)
    });
  }

  else {
    list = personInfo;
  }

  order.length = 0;

  return (
    <table>
      <tbody>
        <tr className="header">
          <td> Etunimi </td>
          <td> Sukunimi </td>
          <td> Ikä </td>
        </tr>
        {list.map(person => (
          <tr key={person.id}>
            <td key={person.firstname}>{person.firstname}</td>
            <td>{person.lastname}</td>
            <td>{person.age}</td>
            <td><button name={person.id as unknown as string} onClick={deletePerson}>Poista</button></td>
            <td><button name={person.id as unknown as string} onClick={openPopup}>Muokkaa</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table;