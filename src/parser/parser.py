import sys

from tree_sitter import Language, Parser
import tree_sitter_javascript as ts_js

from queries import input_query, output_query, if_query, for_query, while_query

type ParsedChunks = list[dict[str, str]]

code_language = {
    "javascript": Language(ts_js.language())
}


def return_output(code):
    print(code)


def return_error(error):
    print(error, file=sys.stderr)


# current language
lang = sys.argv[1]
# code chunks as array
chunks = sys.argv[2].strip('[]').split('\\n,')

chunks = [c.replace('\\n', '') for c in chunks]


if lang not in code_language:
    return_error('[Compiler Error]: unknown language passed to compiler')


print('lang')
print(lang)
print('chunks')
print(chunks)

parser = Parser(code_language[lang])

print('parser')

parsedChunks: ParsedChunks = []

for chunk in chunks:
    cst = parser.parse(bytes(chunk, "utf8"), encoding="utf8")
    print('chunk:cst')
    print(chunk, ':', cst.root_node)

    chunk_type = cst.root_node.child(0).type

    print('child 1 type')
    print(chunk, ':', chunk_type)

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
            print('[Parser error]: unknown node')


print('parsedChunks complete')
print(parsedChunks)
