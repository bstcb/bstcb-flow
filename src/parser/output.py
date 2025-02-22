import sys
import json

def return_output(code):
    print(json.dumps(code))

def return_error(error):
    print(json.dumps(error))
