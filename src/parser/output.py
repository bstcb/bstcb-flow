import sys
import json

def return_output(code):
    print(json.dumps(code))
    exit(0)

def return_error(error):
    print(json.dumps(error))
    exit(0)


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
