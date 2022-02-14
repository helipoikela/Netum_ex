import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    buttom {
        margin-bottom: 20px;
     }
`;


// Määritettään parametrien tyypit
type Props = {
    newFname: string;
    newLname: string;
    newAge:string;
    setNewFname: React.Dispatch<React.SetStateAction<string>>;
    setNewLname: React.Dispatch<React.SetStateAction<string>>;
    setNewAge: React.Dispatch<React.SetStateAction<string>>;
    modifyPerson: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

//Tämä komponentti sisältää popup-valikon muodostamisen
const PopupForm: React.FC<Props> = ({newFname, newLname, newAge, setNewFname, setNewLname, setNewAge, modifyPerson}) => {

  return (
    <Wrapper>
    <div>
      <p className='title'>Muokkaus</p>
      <form>
        <div>
          <label> Etunimi: <input 
                    value={newFname}
                    onChange={(e) => setNewFname(e.target.value)}
                    type="firstname" 
                    name="firstname" /></label>
        </div>
        <div>
          <label> Sukunimi: <input 
                    value={newLname}
                    onChange={(e) => setNewLname(e.target.value)}
                    type="lastname" 
                    name="lastname" /></label>
        </div>
        <div>
          <label> Ikä: <input 
                    value={newAge}
                    onChange={(e) => setNewAge(e.target.value)}
                    type="age" 
                    name="age" /></label>
        </div>
      </form>
      <div>
        <button type="submit" onClick={modifyPerson}> Tallenna </button>
        </div>
    </div>
    </Wrapper>
  )
}

export default PopupForm;
