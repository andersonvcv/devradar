import React, {useState, useEffect} from 'react';
import './styles.css'

function DevForm({ handleAddDev }){
  const [latitude, setLatitude] =  useState('');
  const [longitude, setLongitude] =  useState('');
  const [github_username, setGithubUsername] =  useState('');
  const [techs, setTechs] =  useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []); // if array is empty it executes just one time

  async function submitForm(e){
    e.preventDefault();
    
    await handleAddDev({
      github_username,
      techs,
      latitude,
      longitude,
    });

    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={submitForm}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input name="github_username" id="github_username" required
        value={github_username} onChange={(e => setGithubUsername(e.target.value))}/>
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input name="techs" id="techs" required
        value={techs} onChange={(e => setTechs(e.target.value))}/>
      </div>
        
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input type="number" name="latitude" id="latitude" required value={latitude}
          onChange={e => setLatitude(e.target.value)}/>
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input type="number" name="longitude" id="longitude" required value={longitude}
          onChange={e => setLongitude(e.target.value)}/>
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;