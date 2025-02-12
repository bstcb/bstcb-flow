import sys

from tree_sitter import Language, Parser
import tree_sitter_javascript as ts_js

from queries import input_query

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

for chunk in chunks:
    cst = parser.parse(bytes(chunk, "utf8"), encoding="utf8")
    print('chunk:cst')
    print(chunk, ':', cst.root_node)

    input_query.make_input_node(code_language[lang], cst.root_node)
