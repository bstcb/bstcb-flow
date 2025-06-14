import sys


import code_parser

from output import print_usage


def main():
    args = sys.argv[1:]
    if len(args) < 1:
        print('[Parser Error]: invalid arguments')
        print_usage()
        sys.exit(0)
    elif '-h' in args:
        print_usage()
        sys.exit(0)
    elif '-d' in args:
        print('debug enabled; running verbose...')

    code_parser.parse(args[0])


if __name__ == '__main__':
    main()
