import './CodeEditor.scss';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import AceEditor from 'react-ace';

const CodeEditor = () => {
  return (
    <div className="code__editor">
      <div className="code__editor__wrapper">
        <AceEditor
          mode="javascript"
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          onChange={console.log}
          name="editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
