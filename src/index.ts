import cookNestedData from './cookNestedData';
enum EActionType {
  'INSERT' = 'INSERT',
  'DELETE' = 'DELETE',
  'UPDATE' = 'UPDATE',
  'SELECT' = 'SELECT'
}
interface IActionPayload {
  id: string | number;
  data?: any;
}
interface IActionItem {
  type: EActionType;
  payload: IActionPayload;
}
export default cookNestedData;
export { EActionType, IActionPayload, IActionItem };
