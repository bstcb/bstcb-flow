import sys
import json

def return_output(code):
    print(json.dumps(code))

def return_error(error):
    print(json.dumps(error))


def print_usage():
    print("""
          USAGE: parser language code [flags]
          
          flags:
              -h     print this help
              -d     print debug lines
          """)
