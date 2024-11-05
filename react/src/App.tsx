import React from 'react';
import './App.css';
import Cards from './components/card-list/card-list';
import Form from './components/create-form/create-form';

function App() {
  return (
    <div className="App max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Gestor de Tareas</h1>
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <Form />
      </div>
      <div className="space-y-4">
        <Cards />
      </div>
    </div>
  );
}

export default App;
