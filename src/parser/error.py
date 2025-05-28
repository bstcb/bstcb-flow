import json
from tree_sitter import Language, Node
from debug import debug_print
from output import return_error


def check_error(node: Node, lang: Language):
    debug_print('check_error')
    debug_print(node)
    error_query = lang.query("(ERROR) @error")
    error_query_matches = error_query.matches(node)

    if (len(error_query_matches) > 0):
        error = error_query_matches[0][1]['error'][0]

        debug_print(error.start_point)
        debug_print(error.end_point)
        debug_print("text: " + error.text.decode('utf8'))

        # @TODO: pass start - end region?
        error_dict = {
            "line": error.start_point.row,
            "col": error.start_point.column,
            "message": f'Syntax error: {error.text.decode('utf8')}'
        }

        return_error(error_dict)
    else:
        return
