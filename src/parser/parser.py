import sys

from tree_sitter import Language, Parser
import tree_sitter_javascript as ts_js


code_language = {
    "javascript": Language(ts_js.language())
}


def make_input_node(lang: Language, node):
    query = lang.query(
        """
        (variable_declarator
        name: (identifier) @var.name
        value: (_) @var.value
        )
        """
    )

    print(query.matches(node)[0][1]['var.name'][0].text.decode('utf8'))
    print(query.matches(node)[0][1]['var.value'][0].text.decode('utf8'))


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

    make_input_node(code_language[lang], cst.root_node)
