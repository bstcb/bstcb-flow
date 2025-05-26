import { NodeTokenKind } from '../../transpilers/Token';
import { Variable } from './variable';

export interface NodeCreationData {
  type: NodeTokenKind;
  variable: Variable;
}
