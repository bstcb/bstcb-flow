from tree_sitter import Language


# (call_expression function: (identifier)
#  arguments: (arguments ( (identifier) )))


def make_if_node(lang: Language, node):
    # get logging fiunctions names only?
    query = lang.query(
        """
        (if_statement
        condition: (_) @cond
        )
        """
    )

    value = query.matches(node)[0][1]['cond'][0].text.decode('utf8').strip('()')

    return {'_if_cond': value}

def make_if_end_node(lang: Language):
    return {'_if_cond_end': None}
