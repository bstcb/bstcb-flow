import './App.scss';
import CodeEditor from './components/code/CodeEditor';
import Nodes from './components/nodes/Nodes';

const App = () => {
  return (
    <div className="main__wrapper">
      <Nodes />
      <CodeEditor />
    </div>
  );
};

export default App;
