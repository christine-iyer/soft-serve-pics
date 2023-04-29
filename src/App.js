import './App.css';
import Input from './Input'


function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
       <input type="file" name="profile-file" required/>
      <Input  />
    </div>
  );
}

export default App;
