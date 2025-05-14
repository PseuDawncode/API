import React, { useState, useEffect } from 'react';

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
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 text-center">
      <h1 className="text-2xl font-bold">Guess the Dog Breed 🐶</h1>
      {dogImage && <img src={dogImage} alt="Random dog" className="w-full rounded" />}
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        placeholder="Your guess..."
        className="border rounded p-2 w-full"
      />
      <div className="space-x-2">
        <button onClick={handleGuess} className="bg-blue-500 text-white px-4 py-2 rounded">
          Guess
        </button>
        <button onClick={fetchDogImage} className="bg-gray-300 px-4 py-2 rounded">
          New Dog
        </button>
      </div>
      {result && <p className="mt-4 text-lg">{result}</p>}
    </div>
  );
}
