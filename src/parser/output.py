import sys
import json

def return_output(code):
    print(json.dumps(code))

def return_error(error):
    print(error, file=sys.stderr)
