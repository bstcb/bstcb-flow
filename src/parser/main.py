import sys


import parser


def main():
    args = sys.argv[1:]
    if len(args) < 2:
        print('[Parser Error]: invalid arguments')
    else:
        parser.parse(args[0], args[1])


if __name__ == '__main__':
    main()
