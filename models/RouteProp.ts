import { IStackScreenProp } from "./StackScreenProps";

export interface IRouteProp {
    component: React.FunctionComponent<IStackScreenProp>,
    name: string
}