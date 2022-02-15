import React, { useEffect, useState} from 'react';
import './App.css';
import personService from './services/persons';

import Popup from './Components/Popup';
import PopupForm from './Components/PopupFrom';
import Sorting from './Components/Sorting';
import Table from './Components/Table';



// Määritellää rajapinta PersonInfo-tyypille
interface PersonInfo {
  firstname: string;
  lastname: string;
  age: string;
  id: number;
}

const App: React.FC = () => {
  // Alustetaan useState-muuttujia taulukkoa ja taulukkoon lisättäviä arvoja varten
  const [personInfo, setPersonInfo] = useState<PersonInfo[]>([])
  const [newFname, setNewFname] = useState<string>("");
  const [newLname, setNewLname] = useState<string>("");
  const [newAge, setNewAge] = useState<string>("");
  // Alustetaan useState-muuttuja popup-ikkunaa varten
  const[popupOpen, setPopupOpen] = useState<boolean>(false);
  // Alustetaan useState-muuttuja id:n käsittelyä varten
  const[currentId, setCurrentId] = useState<number>(0);
  // Alustetaan apumuuttuja järjestämistä varten
  const[order, setOrder] = useState<number[]>([]);

  // Haetaan JSON-tiedostosta data effect-hookin avulla
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersonInfo(response.data)
      })
  },[])

  // Funktio joka lisää henkilön tiedot taulukkoon
  const addInfo: (e: React.SyntheticEvent) => void = function (
    e: React.SyntheticEvent 
    ): void {
      e.preventDefault();

    // Muodostetaan uusi PersonInfo-tyyppinen objekti käyttäjän antamista tiedoista
    const newPerson: PersonInfo = {
      firstname: newFname,
      lastname: newLname,
      age: newAge,
      id: Math.floor(Math.random() * (1000 + 0))
    };

    // Lisätään muuttuja tietokantaan ja personInfo-taulukkoon
    personService
      .create(newPerson)
      setPersonInfo(personInfo.concat(newPerson))

    // Tyhjennetään input-kentät
    setNewFname('');
    setNewLname('');
    setNewAge('');
  }

  // Funktio henkilön tietojen poistamiseen
  const deletePerson = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Haetaan painetun napin nimi, sillä se vastaa kyseisten henkilötietojen id-arvoa
    const button: HTMLButtonElement = event.currentTarget;
    let id = button.name as unknown as number;

    // Etsitään kyseistä id:tä vastaava objecti personInfo-taulukosta
    for (let i = 0; i < personInfo.length; i++) {
      if (personInfo[i].id == id) {
        let Person: PersonInfo = personInfo[i];
        // Poistetaan objekti tietokannasta 
        personService
          .deletePerson(Person)
        // Poistetaan objecti taulukosta
        setPersonInfo(personInfo.filter(person => person.id != id))
      }
    }
  }


  // Funktio popup-ikkunan avaamiseen
  const openPopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Haetaan painetun napin nimi, sillä se vastaa kyseisten henkilötietojen id-arvoa
    const button: HTMLButtonElement = event.currentTarget;
    setCurrentId(button.name as unknown as number);

    // Etsitään oikeat henkilötiedot
    let person: PersonInfo = personInfo.find(person => person.id == button.name as unknown as number) as PersonInfo

    // Asetetaan popup-ikkuna näkyväksi
    setPopupOpen(true);

    setNewFname(person.firstname);
    setNewLname(person.lastname);
    setNewAge(person.age);
  }

  // Funktion henkilötietojen muuttamiseen
  const modifyPerson = (e: React.SyntheticEvent) => {
    const newPerson: PersonInfo = {
      firstname: newFname,
      lastname: newLname,
      age: newAge,
      id: currentId as unknown as number
    };

    personService
      .updatePerson(currentId, newPerson)
      .then(response => {
        setPersonInfo(personInfo.map(person => person.id != currentId ? person : response.data))
      })
    
    setPopupOpen(false);

    // Tyhjennetään input-kentät
    setNewFname('');
    setNewLname('');
    setNewAge('');
  }

  // Funktio taulun järjestämistä varten
  const sortList = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Haetaan painetun napin nimi, sillä se vastaa kyseisten henkilötietojen id-arvoa
    const button: HTMLButtonElement = event.currentTarget;
    let sortBy = button.name;

    if (sortBy == "firstname") {
      setPersonInfo(personInfo.sort((a, b) => (a.firstname < b.firstname) ? -1 : 1))
    }

    if (sortBy == "lastname") {
      setPersonInfo(personInfo.sort((a, b) => (a.lastname < b.lastname) ? -1 : 1))
    }

    if (sortBy == "age") {
      setPersonInfo(personInfo.sort((a, b) => (a.age < b.age) ? -1 : 1))
    }

    for (let i = 0; i < personInfo.length; i++) {
      setOrder(order.concat(personInfo[i].id));
    }
    console.log("Sorted List ", personInfo);
  }

  return <div>
    <h1>Henkilötietotaulukko</h1>
    <form onSubmit={addInfo}>
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
    <Sorting sortList={sortList}></Sorting>
    <Popup popupOpen={popupOpen}>
      <PopupForm newFname={newFname}
                 newLname={newLname}
                 newAge={newAge}
                 setNewFname={setNewFname}
                 setNewLname={setNewLname}
                 setNewAge={setNewAge}
                 modifyPerson={modifyPerson}/>
    </Popup>
    <Table personInfo={personInfo}
           deletePerson={deletePerson}
           openPopup={openPopup}
           order={order}
           setOrder={setOrder}>
    </Table>
  </div>
}

export default App;
