import re
import traceback
from tree_sitter import Language, Tree
from debug import debug_print, is_debug
from output import return_error
from queries import input_query, output_query, if_query, for_query, while_query, common_query


def chunk_is_lexical(chunk: str):
    # @MAINTAINING: may require further testing

    non_lexical_chunks_regex = ['}', ']', '\n']
    res = chunk not in non_lexical_chunks_regex
    debug_print(f'[chunk_is_lexical]: {chunk}: {res}')

    return res


def parse_lexical_chunk(chunk_type: str, chunk_index: int, lang: Language, cst: Tree):
    debug_print('lexical chunk')
    try:
        match chunk_type:
            case 'lexical_declaration':
                debug_print(input_query.make_input_node(lang, cst.root_node))
                return input_query.make_input_node(lang, cst.root_node)
            case 'expression_statement':
                debug_print(output_query.make_output_node(lang, cst.root_node))
                return output_query.make_output_node(lang, cst.root_node)
            case 'if_statement':
                debug_print(if_query.make_if_node(lang, cst.root_node))
                return if_query.make_if_node(lang, cst.root_node)
            case 'for_statement':
                debug_print(for_query.make_for_node(lang, cst.root_node))
                return for_query.make_for_node(lang, cst.root_node)
            case 'while_statement':
                debug_print(while_query.make_while_node(lang, cst.root_node))
                return while_query.make_while_node(lang, cst.root_node)
            case _:
                pass

    except Exception as e:
        if is_debug:
            traceback.print_exc()
        return_error({'line': chunk_index, 'col': 0, 'message': f'Unknown or incomplete expression at line {chunk_index}'})


# @CLEANUP: remove unneeded arguments


def parse_non_lexical_chunk(chunk: str, chunk_index: int, lang: Language, cst: Tree):
    debug_print('nonlexical chunk')

    match chunk.strip():
        # closing blocks
        # @TODO: make definition of closing block more convinient
        # for different languages
        case '}':
            debug_print(f'[parse_non_lexical_chunk]: {chunk}: {chunk.strip()}')
            debug_print(chunk.strip())

            chunk_data = common_query.make_block_end_node()

            return chunk_data
