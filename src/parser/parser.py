import sys
import re

from tree_sitter import Language, Parser
import tree_sitter_javascript as ts_js

from debug import debug_print
from output import return_output, return_error
from queries import input_query, output_query, if_query, for_query, while_query

type ParsedChunks = list[dict[str, str]]

code_language = {
    "javascript": Language(ts_js.language())
}


# current language
lang = sys.argv[1]
# code chunks as array
chunks = sys.argv[2].strip('[]').split('\\n,')

chunks = [c.replace('\\n', '') for c in chunks]


if lang not in code_language:
    return_error('[Compiler Error]: unknown language passed to compiler')


debug_print('lang')
debug_print(lang)
debug_print('chunks')
debug_print(chunks)

parser = Parser(code_language[lang])

debug_print('parser')

parsedChunks: ParsedChunks = []

error = None

for i, chunk in enumerate(chunks):
    if chunk_is_lexical():
        parse_lexical_chunk()
    else:
        parse_non_lexical_chunk()

debug_print('parsedChunks complete')

# debug_print(parsedChunks)
if error:
    return_error(error)
else:
    return_output(parsedChunks)


def chunk_is_lexical(chunk: str):
    # non-letter chunks (backets, spaces, newlines) are not lexical chunks 
    return bool(re.match(r'[a-z][A-Z]', s))
    
def parse_non_lexical_chunk(chunk: str):
    debug_print('nonlexical chunk')

    match chunk.strip():
        # closing blocks
        # @TODO: make definition of closing block more convinient
        # for different languages
        case '}':

            # @TODO: define starting token type (by variable)
            
            # chunk_data = if_query.make_if_node(code_language[lang], cst.root_node)
            # chunk_data = for_query.make_for_node(code_language[lang], cst.root_node)
            # chunk_data = while_query.make_while_node(code_language[lang], cst.root_node)

def parse_lexical_chunk(chunk: str):
    
    cst = parser.parse(bytes(chunk, "utf8"), encoding="utf8")
    debug_print('lexical chunk')
    debug_print('chunk:cst')
    debug_print(chunk, ':', cst.root_node)

    chunk_type = cst.root_node.child(0).type

    debug_print('child 1 type')
    debug_print(chunk, ':', chunk_type)

    match chunk_type:
        case 'lexical_declaration':
            chunk_data = input_query.make_input_node(code_language[lang], cst.root_node)
            parsedChunks.append(chunk_data)
        case 'expression_statement':
            chunk_data = output_query.make_output_node(code_language[lang], cst.root_node)
            parsedChunks.append(chunk_data)
        case 'if_statement':
            chunk_data = if_query.make_if_node(code_language[lang], cst.root_node)
            parsedChunks.append(chunk_data)
        case 'for_statement':
            chunk_data = for_query.make_for_node(code_language[lang], cst.root_node)
            parsedChunks.append(chunk_data)
        case 'while_statement':
            chunk_data = while_query.make_while_node(code_language[lang], cst.root_node)
            parsedChunks.append(chunk_data)
        case _:
            error = f'[Parser error]: unknown or incomplete expression at line {i}'
