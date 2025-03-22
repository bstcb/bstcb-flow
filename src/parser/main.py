import sys


import parser

from output import print_usage


def main():
    args = sys.argv[1:]
    if len(args) < 2:
        print('[Parser Error]: invalid arguments')
        print_usage()
        exit(0)
    elif '-h' in args:
        print_usage()
        exit(0)
    elif '-d' in args:
        print('debug enabled; running verbose...')
        
    parser.parse(args[0], args[1])


if __name__ == '__main__':
    main()
