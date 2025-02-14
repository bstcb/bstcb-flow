import os

is_debug = False

def debug_print(*args):
    
    if is_debug:
        print(*args)
