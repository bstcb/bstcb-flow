import sys
import json

from tree_sitter import Language, Parser
import tree_sitter_javascript as ts_js

from debug import debug_print
from output import return_output, return_error
from queries import input_query, output_query, if_query, for_query, while_query

type ParsedChunks = list[dict[str, str]]

code_language = {
    "javascript": Language(ts_js.language())
}


def parse(parsable_code_str: str):
    parsable_code_json = json.loads(parsable_code_str)
    lang = parsable_code_json['language']
    code = parsable_code_json['code']

    if lang not in code_language:
        return_error('[Parser Error]: unknown language passed to parser')

    debug_print('lang')
    debug_print(lang)
    debug_print('code')
    debug_print(code)

    parser = Parser(code_language[lang])
    debug_print('parser')

    parsed_chunks: ParsedChunks = []

    parsed_code = parser.parse(bytes(code, "utf8"), encoding="utf8")
    debug_print(parsed_code.root_node)

    lang_obj = code_language[lang]

    def handle_node(node):
        node_type = node.type
        try:
            # Variable declaration
            if node_type == "variable_declarator":
                parsed_chunks.append(input_query.make_input_node(lang_obj, node))
            # Output call
            elif node_type == "call_expression":
                parsed_chunks.append(output_query.make_output_node(lang_obj, node))
            # If statement
            elif node_type == "if_statement":
                parsed_chunks.append(if_query.make_if_node(lang_obj, node))
                # Recursively process the body of the if statement
                for child in node.children:
                    handle_node(child)
                parsed_chunks.append(if_query.make_if_end_node(lang_obj))
            # For loop
            elif node_type == "for_statement":
                parsed_chunks.append(for_query.make_for_node(lang_obj, node))
                for child in node.children:
                    handle_node(child)
                parsed_chunks.append(for_query.make_for_end_node())
            # While loop
            elif node_type == "while_statement":
                parsed_chunks.append(while_query.make_while_node(lang_obj, node))
                for child in node.children:
                    handle_node(child)
                parsed_chunks.append(while_query.make_while_end_node())
            # Block statement (e.g., function bodies, if/else bodies)
            elif node_type == "statement_block" or node_type == "block":
                for child in node.children:
                    handle_node(child)
            # Expression statement (e.g., a call or assignment as a statement)
            elif node_type == "expression_statement":
                for child in node.children:
                    handle_node(child)
            else:
                # Recursively process all children for unknown/other node types
                for child in node.children:
                    handle_node(child)
        except Exception as e:
            debug_print(f"Error handling node {node_type}: {e}")

    # Start recursion from the root node's children
    for child in parsed_code.root_node.children:
        handle_node(child)

    debug_print('parsed_chunks complete')
    debug_print(parsed_chunks)

    return_output(parsed_chunks)
