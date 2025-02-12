from tree_sitter import Language


# (call_expression function: (identifier)
#  arguments: (arguments ( (identifier) )))


def make_output_node(lang: Language, node):
    # get logging fiunctions names only?
    query = lang.query(
        """
        (call_expression
         arguments: (arguments (_)) @func.args
        )
        """
    )

    print(query.matches(node)[0][1]['func.args']
          [0].text.decode('utf8').strip('()'))
