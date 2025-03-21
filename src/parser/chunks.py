import re

from tree_sitter import Language, Tree
from debug import debug_print
from queries import input_query, output_query, if_query, for_query, while_query

def chunk_is_lexical(chunk: str):
    # non-letter chunks (backets, spaces, newlines) are not lexical chunks
    # @TODO: fix `is_lexical` check
    return True


def parse_lexical_chunk(chunk_type: str, lang: Language, cst: Tree):
    debug_print('lexical chunk')

    match chunk_type:
        case 'lexical_declaration':
            return input_query.make_input_node(lang, cst.root_node)
        case 'expression_statement':
            return output_query.make_output_node(lang, cst.root_node)
        case 'if_statement':
            return if_query.make_if_node(lang, cst.root_node)
        case 'for_statement':
            return for_query.make_for_node(lang, cst.root_node)
        case 'while_statement':
            return while_query.make_while_node(lang, cst.root_node)
        case _:
            return f'[Parser error]: unknown or incomplete expression at line {i}'


def parse_non_lexical_chunk(chunk: str, lang: Language, cst: Tree):
    debug_print('nonlexical chunk')

    match chunk.strip():
        # closing blocks
        # @TODO: make definition of closing block more convinient
        # for different languages
        case '}':

            # @TODO: define starting token type (by variable)
            
            chunk_data = if_query.make_if_node(lang, cst.root_node)
            # chunk_data = for_query.make_for_node(lang, cst.root_node)
            # chunk_data = while_query.make_while_node(lang, cst.root_node)
