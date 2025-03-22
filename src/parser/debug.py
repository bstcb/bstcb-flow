import os
import sys

is_debug = '-d' in sys.argv[1:]

def debug_print(*args):
    if is_debug:
        print(*args)
