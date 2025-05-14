import React, { useState, useEffect } from 'react';
import './dogViewer.css';

const getBreedFromUrl = (url) => {
  const parts = url.split('/');
  const breedIndex = parts.indexOf('breeds') + 1;
  return parts[breedIndex]?.split('-').join(' ');
};

export default function DogViewer() {
  const [dogImage, setDogImage] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [breed, setBreed] = useState('');
  const [result, setResult] = useState('');

  const fetchDogImage = async () => {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await res.json();
    setDogImage(data.message);
    const actualBreed = getBreedFromUrl(data.message);
    setBreed(actualBreed);
    setResult('');
    setUserGuess('');
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  const handleGuess = () => {
    if (userGuess.toLowerCase().trim() === breed.toLowerCase()) {
      setResult('🎉 Correct!');
    } else {
      setResult(`❌ Wrong! It was: ${breed}`);
    }
  };

  return (
    <div className="dog-container">
      <h1>Guess the Dog Breed 🐶</h1>
      {dogImage && <img src={dogImage} alt="Random Dog" className="dog-image" />}
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Your guess..."
        className="input"
      />
      <div className="buttons">
        <button onClick={handleGuess}>Guess</button>
        <button onClick={fetchDogImage}>New Dog</button>
      </div>
      {result && <p className="result">{result}</p>}
    </div>
  );
}
