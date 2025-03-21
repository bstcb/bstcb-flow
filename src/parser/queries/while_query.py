from tree_sitter import Language


def make_while_node(lang: Language, node):
    # get logging fiunctions names only?
    query = lang.query(
        """
        (while_statement
        condition: (_) @cond
        )
        """
    )

    value = query.matches(node)[0][1]['cond'][0].text.decode('utf8').strip('()')

    return {'_while_lp': value}


def make_while_end_node():
    return {'while_lp_end': None}
