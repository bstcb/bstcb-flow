import sys
import re
import json

from tree_sitter import Language, Parser
import tree_sitter_javascript as ts_js

from debug import debug_print
from output import return_output, return_error
from chunks import chunk_is_lexical, parse_lexical_chunk, parse_non_lexical_chunk
from error import check_error
from queries import input_query, output_query, if_query, for_query, while_query

type ParsedChunks = list[dict[str, str]]

code_language = {
    "javascript": Language(ts_js.language())
}
# `parsable_code` is a json string
# with `language` and `code` props


def parse(parsable_code_str: str):
    parsable_code_json = json.loads(parsable_code_str)
    lang = parsable_code_json['language']
    code = parsable_code_json['code']

    if lang not in code_language:
        return_error('[Parser Error]: unknown language passed to parser')

    chunks = code.split('\n')

    debug_print('lang')
    debug_print(lang)
    debug_print('code')
    debug_print(code)
    debug_print('chunks')
    debug_print(chunks)

    parser = Parser(code_language[lang])
    debug_print('parser')

    parsed_chunks: ParsedChunks = []
    error = None

    for i, chunk in enumerate(chunks):
        debug_print(f'========= CHUNK {i}  =========\n\n\n')
        cst = parser.parse(bytes(chunk, "utf8"), encoding="utf8")
        debug_print('chunk:cst')
        debug_print(chunk, ':', cst.root_node)

        # @FIX: the most dangerous string
        check_error(cst.root_node, code_language[lang])
        chunk_type = cst.root_node.child(0).type

        debug_print('child type')
        debug_print(chunk, ':', chunk_type)

        if chunk_is_lexical(chunk):
            parsed_chunk = parse_lexical_chunk(chunk_type, i, code_language[lang], cst)
            if isinstance(parsed_chunk, str):
                error = parsed_chunk
                return_error(error)
            else:
                parsed_chunks.append(parsed_chunk)
        else:
            parsed_chunk = parse_non_lexical_chunk(chunk, i, code_language[lang], cst)
            if isinstance(parsed_chunk, str):
                error = parsed_chunk
                return_error(error)
            else:
                parsed_chunks.append(parsed_chunk)

    debug_print('parsed_chunks complete')
    debug_print(parsed_chunks)

    return_output(parsed_chunks)
