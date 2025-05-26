import subprocess
import os
import json
from pathlib import Path

TEST_INPUTS_FOLDER = os.path.join('tests', 'test_inputs')

def test_js_output(snapshot):
    test_input_filename = (Path(__file__).stem) + '.json'
    
    test_input_path = os.path.join(TEST_INPUTS_FOLDER, test_input_filename)

    print(test_input_path)

    with open(test_input_path) as f:
        test_data = json.load(f)

    test_data = json.dumps(test_data)
    print(test_data)
    run = subprocess.run(f"python main.py '{test_data}'", shell=True, stdout=subprocess.PIPE, text=True)
    print(run.stdout)
    
    snapshot.assert_match(run.stdout, test_input_filename)
