import sys
import json

type Error = {
    "line": int,
    "col": int,
    "message": str
}


def return_output(code):
    print(json.dumps(code))
    sys.exit(0)


def return_error(error: Error):
    print(json.dumps(error))
    sys.exit(0)


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
