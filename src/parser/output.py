import sys
import json

def return_output(code):
    print(json.dumps(code))

def return_error(error):
    print(json.dumps(error))


def print_usage():
    print(r"""
           USAGE: parser parsableCodeJsonString [flags]
          
          parsableCodeJsonString example:
          
          {
              "language": "javascript",
              "code": "let x = 0\nconsole.log(1)"
          }
          
          flags:
              -h     print this help
              -d     print debug info
          """)
