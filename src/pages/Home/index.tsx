import React, { useState, useEffect } from 'react';

import './styles.css';
import { Card, CardProps } from '../../components/Cards';

/*
type ProfileResponse = {
  name: string;
  avatar_url: string;
}
*/

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState({name:'', avatar:''});

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(listaAnterior => [...listaAnterior, newStudent]);
    // listaAnterior é um vetor com informações anteriores que; com uma arrowfunciton retorna (...) dentro do vetor e adiciona o newStudent
  }

  useEffect(() => {
    fetch ('https://api.github.com/users/geovanefi')
      .then(response => response.json())
      .then(data => {
        setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
      })
  },[]); // local para acionar ao mudar estados


  return (
    <div className="container">
      <header>
        <h1>Lista Presença </h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="imagem de perfil" />
        </div>

      </header>

      <input 
        type="text" 
        placeholder="Digite seu nome..." 
        onChange={e => setStudentName(e.target.value)}
      />

      <button 
        type="button" onClick={handleAddStudent}>
        Adicionar
      </button>


      {
        students.map(student =>
          < Card 
            key={student.time} //identidade. Pode ser o ID
            name={student.name}
            time={student.time}
          />
        )
      }
      
      
    </div>
  )
}

