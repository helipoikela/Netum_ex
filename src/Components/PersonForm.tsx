import React from "react";

type Props = {
  addInfo: (e: React.SyntheticEvent) => void;
  newFname: string;
  setNewFname: React.Dispatch<React.SetStateAction<string>>;
  newLname: string;
  setNewLname: React.Dispatch<React.SetStateAction<string>>;
  newAge: string;
  setNewAge: React.Dispatch<React.SetStateAction<string>>;

}

// Tämä metodi rakentaa kyselypohjan, johon tallennettavat tiedot kirjoitetaan
const PersonForm: React.FC<Props> = ({addInfo, newFname, setNewFname, newLname, setNewLname, newAge, setNewAge}) => {
  return (
    <form className='personform' onSubmit={addInfo}>
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
                  name="age" 
                  placeholder=""/></label>
      </div>
      <div>
        <button type="submit"> Lisää </button>
      </div>
    </form>
  )
}

export default PersonForm;