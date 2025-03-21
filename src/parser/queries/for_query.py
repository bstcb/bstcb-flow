from tree_sitter import Language


# (call_expression function: (identifier)
#  arguments: (arguments ( (identifier) )))


def make_for_node(lang: Language, node):
    # get logging fiunctions names only?
    query = lang.query(
        """
        (for_statement
        initializer: (_) @for.init
        condition: (_) @for.cond
        increment: (_) @for.inc
        )
        """
    )
    
    statements = []

    statements.append(query.matches(node)[0][1]['for.init'][0].text.decode('utf8').strip('()'))
    statements.append(query.matches(node)[0][1]['for.cond'][0].text.decode('utf8').strip('()'))
    statements.append(query.matches(node)[0][1]['for.inc'] [0].text.decode('utf8').strip('()'))

    return {'_for_lp': ' '.join(statements)}

def make_for_end_node():
    return {'for_lp_end': None}
