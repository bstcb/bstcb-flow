from tree_sitter import Language


def make_input_node(lang: Language, node):
    query = lang.query(
        """
        (variable_declarator
        name: (identifier) @var.name
        value: (_) @var.value
        )
        """
    )

    name = query.matches(node)[0][1]['var.name'][0].text.decode('utf8')
    value = query.matches(node)[0][1]['var.value'][0].text.decode('utf8')

    return {'_input': '='.join([name, value])}
